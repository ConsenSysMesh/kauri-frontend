import { Observable } from "rxjs/Observable";
import { Epic } from "redux-observable";
import { trackMixpanelAction } from "../Link/Module";
import {
  showNotificationAction,
  routeChangeAction,
  IDependencies,
} from "../../../lib/Module";
import generatePublishArticleHash from "../../../lib/generate-publish-article-hash";

import { approveArticle, rejectArticle } from "../../../queries/Article";

interface IApproveArticlePayload {
  id: string;
  version: number;
  author: string;
  contentHash: string;
  dateCreated: string;
}

const APPROVE_ARTICLE = "APPROVE_ARTICLE";

interface IApproveArticleAction {
  type: string;
  payload: IApproveArticlePayload;
}

export const approveArticleAction = (
  payload: IApproveArticlePayload
): IApproveArticleAction => ({
  payload,
  type: APPROVE_ARTICLE,
});

interface IReduxState {
  app: {
    user: {
      id: string;
    };
  };
}

export const approveArticleEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, personalSign }
) =>
  action$
    .ofType(APPROVE_ARTICLE)
    .switchMap(
      ({ payload: { id, version, contentHash, author, dateCreated } }) =>
        Observable.fromPromise(
          personalSign(
            generatePublishArticleHash(
              id,
              version,
              contentHash,
              author,
              dateCreated
            )
          )
        )
          .mergeMap(signature =>
            apolloClient.mutate({
              mutation: approveArticle,
              variables: {
                id,
                signature,
                version,
              },
            })
          )
          .do(() => apolloClient.resetStore())
          .mergeMap(() =>
            Observable.of(
              routeChangeAction(
                `/article/${id}/v${version}/article-${"published"}`
              ),
              trackMixpanelAction({
                event: "Offchain",
                metaData: {
                  resource: "article",
                  resourceAction: "approved article",
                  resourceID: id,
                  resourceVersion: version,
                },
              }),
              showNotificationAction({
                description: "The update has been approved!",
                message: `Article approved`,
                notificationType: "success",
              })
            )
          )
          .catch(err => {
            console.error(err);
            return Observable.of(
              showNotificationAction({
                description: "Please try again!",
                message: "Approval error",
                notificationType: "error",
              })
            );
          })
    );

interface IRejectArticlePayload {
  id: string;
  version: number;
  cause: string;
}

const REJECT_ARTICLE = "REJECT_ARTICLE";

interface IRejectArticleAction {
  type: string;
  payload: IRejectArticlePayload;
}

export const rejectArticleAction = (
  payload: IRejectArticlePayload
): IRejectArticleAction => ({
  payload,
  type: REJECT_ARTICLE,
});

export const rejectArticleEpic: Epic<any, IReduxState, IDependencies> = (
  action$,
  _,
  { apolloClient, apolloSubscriber }
) =>
  action$
    .ofType(REJECT_ARTICLE)
    .switchMap(({ payload: { id, version, cause } }: IRejectArticleAction) =>
      Observable.fromPromise(
        apolloClient.mutate({
          mutation: rejectArticle,
          variables: { id, version, cause },
        })
      )
        .flatMap(
          ({
            data: {
              rejectArticle: { hash },
            },
          }: {
            data: { rejectArticle: { hash: string } };
          }) => apolloSubscriber(hash)
        )
        .do(() => apolloClient.resetStore())
        .mergeMap(() =>
          Observable.of(
            routeChangeAction(`/article/${id}/v${version}/article-rejected`),
            trackMixpanelAction({
              event: "Offchain",
              metaData: {
                resource: "article",
                resourceAction: "reject article",
                resourceID: id,
              },
            }),
            showNotificationAction({
              description: `It will not show up in your approvals queue anymore!`,
              message: "Article rejected!",
              notificationType: "success",
            })
          )
        )
    );