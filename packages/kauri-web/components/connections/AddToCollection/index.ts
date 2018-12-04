import View from "./View";
import { connect } from "react-redux";
import { closeModalAction } from "../../../../kauri-components/components/Modal/Module";
import { routeChangeAction } from "../../../lib/Module";

export default connect(
  (state: { app: { user: { id: string } } }) => ({
    userId: state.app && state.app.user && state.app.user.id,
  }),
  { closeModalAction, routeChangeAction }
)(View);