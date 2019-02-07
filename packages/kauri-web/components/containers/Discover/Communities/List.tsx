import Communities from "./ListView";
import { compose, graphql } from "react-apollo";
import { getAllCommunities } from "../../../../queries/Community";
import { connect } from "react-redux";
import { routeChangeAction } from "../../../../lib/Module";
import withLoading from "../../../../lib/with-loading";
import withPagination from "../../../../lib/with-pagination";
const config = require("../../../../config/default");

interface IState {
  app: {
    hostName: string;
  };
}

const mapStateToProps = (state: IState) => {
  return { hostName: state.app && state.app.hostName };
};

const QUERY_NAME = "CommunityQuery";

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(getAllCommunities, {
    name: QUERY_NAME,
    options: () => ({
      fetchPolicy: "no-cache",
      variables: {
        filter: {
          mustNotIncludeUserId: config.testingAccounts,
        },
      },
    }),
  }),
  withLoading()
)(withPagination(Communities, "searchCommunities", QUERY_NAME));
