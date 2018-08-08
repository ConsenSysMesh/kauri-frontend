let component = ReasonReact.statelessComponent("ArticleCard");

module Styles = {
  let image =
    Css.(
      style([
        height(px(170)),
        borderTopLeftRadius(px(4)),
        borderTopRightRadius(px(4)),
      ])
    );

  let container =
    Css.(style([display(`flex), flexDirection(column), flex(1)]));

  let footer =
    Css.(
      style([
        display(`flex),
        flexDirection(row),
        alignItems(center),
        justifyContent(spaceBetween),
        padding2(~v=px(4), ~h=px(14)),
      ])
    );
  let content =
    Css.(
      style([
        padding4(
          ~top=px(11),
          ~right=px(14),
          ~bottom=px(11),
          ~left=px(14),
        ),
      ])
    );
};

let make =
    (
      ~tags=?,
      ~date: string,
      ~title: string,
      ~content: string,
      ~imageURL=?,
      ~username,
      /* ~views,
         ~upvotes, */
      ~profileImage=?,
      ~changeRoute=?,
      ~articleId: string,
      ~articleVersion: int,
      _children,
    ) => {
  ...component,
  render: _self =>
    <BaseCard>
      <div
        onClick=(
          _ =>
            switch (changeRoute) {
            | Some(changeRoute) =>
              changeRoute(
                {j|/article/$articleId/article-version/$articleVersion|j},
              )
            | None => ()
            }
        )
        className=Styles.container>
        (
          switch (imageURL) {
          | Some(string) => <img className=Styles.image src=string />
          | None => ReasonReact.null
          }
        )
        <div className=Styles.content>
          <Label text=("Posted " ++ date) />
          <Heading text=title />
          (
            content |. String.sub(0, 2) |. String.contains('{') ?
              [%raw
                {|
                  (() => {
                    if (process.env.STORYBOOK !== 'true') {
                      var DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js").default;
                      return React.createElement(DescriptionRow, { record: { text: content$1 }, type: 'article card' }, null);
                    }
                  })()
                |}
              ] :
              <Paragraph text=content />
          )
          (
            switch (tags) {
            | Some(tags) => <TagList tags />
            | None => ReasonReact.null
            }
          )
        </div>
        <Separator direction="horizontal" />
        <div className=Styles.footer>
          <UserWidgetSmall
            username
            profileImage=(
              switch (profileImage) {
              | Some(image) => image
              | None => "https://cdn1.vectorstock.com/i/1000x1000/77/15/seamless-polygonal-pattern-vector-13877715.jpg"
              }
            )
          />
        </div>
      </div>
    </BaseCard>,
  /* <CardCounter
       value=views label="Views"
       />
     <CardCounter
     value=upvotes label="Upvotes"
     /> */
};

[@bs.deriving abstract]
type jsProps = {
  date: string,
  title: string,
  content: string,
  imageURL: string,
  username: string,
  profileImage: string,
  articleVersion: int,
  changeRoute: string => unit,
};