exception NoHashFound;
exception NoResponseData;

let (|?) = (a, b) =>
  switch (a) {
  | None => None
  | Some(a) => b(a)
  };

module DraftArticle = {
  let actionType = "DRAFT_ARTICLE";

  [@bs.deriving abstract]
  type metadata = {
    [@bs.as "FOR_VERSION"]
    forVersion: string,
  };

  [@bs.deriving abstract]
  type payload = {
    id: string,
    subject: string,
    text: string,
    category: string,
    sub_category: string,
    metadata,
    draft: bool,
    request_id: option(string),
  };

  [@bs.deriving abstract]
  type action = {
    [@bs.as "type"]
    type_: string,
    payload,
  };
};

let draftArticleAction = (payload: DraftArticle.payload) : DraftArticle.action =>
  DraftArticle.action(~type_=DraftArticle.actionType, ~payload);

let draftArticleEpic =
    (
      action: DraftArticle.action,
      _store,
      dependencies: ReduxObservable.Dependencies.dependencies,
    ) =>
  ReduxObservable.Observable.(
    action
    |. ofType(DraftArticle.actionType)
    |. switchMap(draftArticleAction => {
         let (apolloClient, subscriber) =
           dependencies
           |. (
             ReduxObservable.Dependencies.apolloClientGet,
             ReduxObservable.Dependencies.subscribeToOffchainEvent,
           );

         let (resourceID, subject, category, text, sub_category) =
           draftArticleAction
           |. DraftArticle.payloadGet
           |. DraftArticle.(
                idGet,
                subjectGet,
                categoryGet,
                textGet,
                sub_categoryGet,
              );

         let request_id =
           switch (
             draftArticleAction
             |. DraftArticle.payloadGet
             |. DraftArticle.request_idGet
           ) {
           | Some(request_id) => request_id
           | None => ""
           };

         let forVersion =
           draftArticleAction
           |. DraftArticle.payloadGet
           |. DraftArticle.metadataGet
           |. DraftArticle.forVersionGet;

         let metadataString = {j|{"FOR_VERSION", $(forVersion)}|j};

         let draftArticleMutation =
           Article_Queries.DraftArticle.make(
             ~id=resourceID,
             ~subject,
             ~text,
             ~category,
             ~sub_category,
             ~metadata=Js.Json.parseExn(metadataString),
             ~draft=true,
             ~request_id,
             (),
           );

         fromPromise(
           apolloClient##mutate({
             "mutation": Article_Queries.DraftArticleMutation.graphqlMutationAST,
             "variables": draftArticleMutation##variables,
             "fetchPolicy": Js.Nullable.undefined,
           }),
         )
         |. map(response => {
              let possibleResponse = Js.Nullable.toOption(response##data);
              switch (possibleResponse) {
              | Some(data) =>
                let result = Article_Queries.DraftArticle.parse(data);
                switch (result##submitArticle |? (x => x##hash)) {
                | Some(hash) => hash
                | None => raise(NoHashFound)
                };
              | _ => raise(NoResponseData)
              };
            })
         |. flatMap(hash => fromPromise(subscriber(hash)))
         |. tap(_ => apolloClient##resetStore())
         |. map(
              (
                offchainEventResponse: ReduxObservable.Dependencies.OffchainEvent.response,
              ) =>
              ReduxObservable.Dependencies.OffchainEvent.(
                dataGet(offchainEventResponse)
                |. command_outputGet
                |. submitArticleResponseGet
                |. versionGet
              )
            )
         |. flatMap(article_version => {
              open App_Module;

              let trackDraftArticlePayload =
                trackMixPanelPayload(
                  ~event="Offchain",
                  ~metaData={
                    resource: "article",
                    resourceID,
                    resourceAction: "draft article",
                  },
                );
              let trackDraftArticleAction =
                trackMixPanelAction(trackDraftArticlePayload);

              let notificationType = notificationTypeToJs(`Success);
              let showDraftArticleNotificationPayload =
                showNotificationPayload(
                  ~notificationType,
                  ~message="Article drafted",
                  ~description=
                    "You can revisit your article and continue working on it later on! Find it in 'Profile > My Articles > Drafted Articles'.",
                );

              let showDraftArticleNotificationAction =
                showNotificationAction(showDraftArticleNotificationPayload);

              of3(
                trackDraftArticleAction,
                showDraftArticleNotificationAction,
                routeChangeAction(
                  route(
                    ~slug1=ArticleId(resourceID),
                    ~slug2=ArticleVersionId(article_version),
                    ~routeType=ArticleApproved,
                  ),
                ),
              );
            });
       })
  );