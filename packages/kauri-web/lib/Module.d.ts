import { ApolloClient } from "apollo-client";
import { IAddArticleToCollectionAction } from "../components/connections/AddToCollection/Module";

type NotificationType = "success" | "info" | "warning" | "error";

interface IShowNotificationPayload {
  notificationType: NotificationType;
  message: string;
  description: string;
}

interface IShowNotificationAction {
  callback: undefined;
  type: "SHOW_NOTIFICATION";
  payload: IShowNotificationPayload;
}

export function showNotificationAction(
  payload: IShowNotificationPayload
): IShowNotificationAction;

interface IRouteChangeAction {
  callback: undefined;
  type: "ROUTE_CHANGE";
  payload: string;
}

export function routeChangeAction(url: string): IRouteChangeAction;

export const setNavcolorOverrideAction = any;

export interface IDependencies {
  apolloClient: ApolloClient<{}>;
  apolloSubscriber: <T>(hash: string) => Promise<{ data: { output: T } }>;
  smartContracts: any;
  web3: any;
  fetch: any;
  web3PersonalSign: any;
  getGasPrice: any;
  driverJS: any;
  personalSign: any;
}

export interface IAction {
  callback: () => void | undefined;
  payload?: {};
  type: string;
}

export type Actions =
  | IRouteChangeAction
  | IShowNotificationAction
  | IAddArticleToCollectionAction;

export interface IUser {
  id: string;
}

export interface IReduxState {
  app: {
    user?: IUser;
  };
}
