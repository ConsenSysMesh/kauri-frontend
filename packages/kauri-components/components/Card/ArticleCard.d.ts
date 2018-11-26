import * as React from "react";

type PageType = "RinkebyPublicProfile" | "Collection";

interface IHoverActionPayload {
  id: string;
  version: string;
}

interface IViewActionPayload {
  id: string;
  version: string;
}

interface IProps {
  id: string;
  version: number;
  content: string;
  date: string;
  title: string;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  imageURL?: string | undefined | null;
  cardHeight?: number;
  cardWidth?: number;
  linkComponent?: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  pageType?: PageType;
  hoverAction?: (IHoverActionPayload) => void;
  viewAction?: (IViewActionPayload) => void;
  isChosenArticle?: boolean;
  resourceType: "article" | "community" | null;
  changeRoute?: (route: string) => void;
}

declare const ArticleCard: React.SFC<IProps>;

export default ArticleCard;
