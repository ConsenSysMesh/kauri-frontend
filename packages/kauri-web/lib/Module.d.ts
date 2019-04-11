import { ApolloClient } from "apollo-client";
import { IAddArticleToCollectionAction } from "../components/connections/AddToCollection/Module";
import IVoteAction from "../components/containers/Article/ApprovedArticle/VoteModule";

type NotificationType = "success" | "info" | "warning" | "error";

export interface IShowNotificationPayload {
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
  apolloSubscriber: <T>(
    hash: string,
    version?: string,
    author?: any
  ) => Promise<{ data: { output: T | any } }>;
  apolloChildHashesSubscriber: <T>(
    childHashes: string[]
  ) => Array<Promise<{ data: { output: T | any } }>>;
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
  | IVoteAction
  | IRouteChangeAction
  | IShowNotificationAction
  | IAddArticleToCollectionAction;

export interface IUser {
  id: string;
  avatar: string | null;
  username: string | null;
}

export interface IReduxState {
  app: {
    user?: IUser;
    hostName: string;
  };
}
