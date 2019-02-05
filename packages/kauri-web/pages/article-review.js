import React from "react";
import { withApollo, compose } from "react-apollo";
import withData from "../lib/with-data";
import App from "../layouts/App";
import ArticleReview from "../components/containers/ArticleReview";
import { withRouter } from "next/router";
class ArticleReviewPage extends React.Component {
  render() {
    return (
      <App confirmationPage url={this.props.router}>
        <ArticleReview
          type="review"
          id={this.props.router.query.id}
          version={this.props.router.query.version}
        />
      </App>
    );
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ArticleReviewPage);
