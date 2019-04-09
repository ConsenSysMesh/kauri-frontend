// @flow

export const searchArticles = (payload, maxResult, filter) => ({
    query:
        `query searchArticles($page: Int = 0, $size: Int = 100
            $sort: String = "date_created"
            $dir: DirectionInput = ASC
            $filter: ArticleFilterInput) {
                searchArticles(
                    page: $page
                    size: $size
                    sort: $sort
                    dir: $dir
                filter: $filter) {
                    content {
                        id
                        title
                        version
                        status
                        dateCreated
                    }
                    isLast
                    totalElements
        }
    }`,
    variables: {
        page: payload.page,
        size: maxResult,
        filter: filter,
    },
    operationName: 'searchArticles'
});

export const transferArticle = (payload) => ({
    query:"mutation initiateArticleTransfer($id: String, $recipient: ResourceIdentifierInput) { initiateArticleTransfer ($id: id, recipient: $recipient) {hash} }",
    variables: {
          id: payload.articleID,
          recipient: {"type": "USER", id: payload.recipientID}
    },
    operationName: "initiateArticleTransfer"
  })