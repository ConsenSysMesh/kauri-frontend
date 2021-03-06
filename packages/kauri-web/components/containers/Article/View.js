// @flow
import React from "react";
import ApprovedArticle from "./ApprovedArticle/View";
import R from "ramda";
import Loading from "../../common/Loading";
import Head from "next/head";
import type { AddCommentPayload } from "../AddCommentForm/Module";
import { recordView } from "../../../queries/Utils";

type ArticleProps = {
  id: string,
  data: {
    getArticle: ArticleDTO,
  },
  approveArticleAction: any => void,
  routeChangeAction: string => void,
  rejectArticleAction: ({ id: string, version: number, cause: string }) => void,
  addCommentAction: (AddCommentPayload, callback: any) => void,
  personalUsername: ?string,
  publishArticleAction: any => void,
  hostName: string,
  proposedCommunityId?: string,
};

class Article extends React.Component<ArticleProps> {
  approveArticle = () => {
    const articleData = this.props.data && this.props.data.getArticle;
    const { id, version, contentHash, author, dateCreated } = articleData;
    return this.props.approveArticleAction({
      id,
      version,
      author: author.id,
      contentHash,
      dateCreated,
    });
  };

  rejectArticle = cause => {
    const articleData = this.props.data && this.props.data.getArticle;
    const { id, version } = articleData;
    return this.props.rejectArticleAction({ id, version, cause });
  };

  updateUnsubmittedArticle = () => {
    if (this.props.routeChangeAction) {
      if (
        this.props.data.getArticle &&
        typeof this.props.data.getArticle.id === "string"
      ) {
        this.props.routeChangeAction(
          `/article/${this.props.data.getArticle.id}/v${
            this.props.data.getArticle.version
          }/update-article`
        );
      }
    }
  };

  preApproveArticle = () => {
    if (this.props.data.getArticle) {
      if (
        typeof this.props.data.getArticle.text === "string" &&
        typeof this.props.data.getArticle.id === "string"
      ) {
        const preApproveArticlePayload: AddCommentPayload = {
          id: this.props.data.getArticle.id,
          comment: `I've reviewed your article, and everything looks good.
          Please "Submit for publishing" and it will be published soon!`,
        };
        this.props.addCommentAction(preApproveArticlePayload, () =>
          this.props.routeChangeAction(
            `/article/${this.props.data.getArticle.id}/v${
              this.props.data.getArticle.version
            }/article-approved`
          )
        );
      }
    }
  };

  publishArticle = () => {
    if (typeof this.props.data.getArticle === "object") {
      if (
        typeof this.props.data.getArticle.id === "string" &&
        typeof this.props.data.getArticle.version === "number" &&
        typeof this.props.data.getArticle.contentHash === "string" &&
        typeof this.props.data.getArticle.dateCreated === "string" &&
        typeof this.props.data.getArticle.authorId === "string"
      ) {
        const {
          id,
          version,
          contentHash,
          dateCreated,
          authorId,
          owner,
        } = this.props.data.getArticle;
        // TODO FIX ROUTE MATCHING FOR CONFIRMATION PAGE VS ID
        const publishArticlePayload = {
          id,
          version,
          contentHash,
          dateCreated,
          contributor: authorId,
          owner,
        };
        console.log("publishArticlePayload, ", publishArticlePayload);
        this.props.publishArticleAction(publishArticlePayload);
      }
    }
  };

  componentDidMount() {
    this.props.client.mutate({
      fetchPolicy: "no-cache",
      mutation: recordView,
      variables: {
        resourceId: {
          type: "ARTICLE",
          id: this.props.id,
        },
      },
    });
  }
  render() {
    if (R.path(["data", "getArticle", "status"])(this.props)) {
      return <ApprovedArticle {...this.props} />;
    } else return <Loading />;
  }
}

export default Article;
