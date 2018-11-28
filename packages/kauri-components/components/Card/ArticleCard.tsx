import * as React from "react";
import styled, { css } from "../../lib/styled-components";
import R from "ramda";
import TextTruncate from "react-text-truncate";
import BaseCard from "./BaseCard";
import { Label, H1, BodyCard } from "../Typography";
import theme from "../../lib/theme-config";
import SecondaryButton from "../Button/SecondaryButton";
import UserAvatar from "../UserAvatar";
import {
  toggleReducer,
  IToggleState,
  IToggleAction,
  hideDispatch,
  toggleDispatch,
  toggleInitialState,
} from "../../../kauri-web/lib/use-toggle";

const DEFAULT_CARD_HEIGHT = 290;
const DEFAULT_CARD_WIDTH = 290;
const DEFAULT_CARD_PADDING = theme.space[2];

const withImageURLPaddingCss = css`
  padding: ${props => props.theme.space[2]}px;
`;

const Image = styled<
  { imageURL: string | undefined; cardHeight: number },
  "div"
>("div")`
  height: ${props => (props.cardHeight < 420 ? "116px" : "170px")};
  background: url(${props =>
      typeof props.imageURL === "string" && props.imageURL})
    center center / cover;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Container = styled<{ imageURL: string | undefined }, "div">("div")`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
  > a {
    height: ${props => (props.imageURL ? "calc(100% - 85px)" : "100%")};
  }
`;

const Content = styled<{ imageURL: string | undefined }, "div">("div")`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  > div:first-child {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  > :nth-child(2) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${props => typeof props.imageURL === "string" && withImageURLPaddingCss};
`;

const Footer = styled<{ imageURL: string | undefined }, "div">("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${props => typeof props.imageURL === "string" && withImageURLPaddingCss};
  padding-top: ${props => typeof props.imageURL === "string" && "0px"};
`;

const withImageURLDividerCss = css`
  width: calc(100% - ${props => props.theme.space[3]}px);
  margin-left: ${props => props.theme.space[2]}px;
`;

const Divider = styled<{ imageURL: string | undefined }, "div">("div")`
  width: 100%;
  margin: ${props => props.theme.space[2]}px 0px;
  margin-top: auto;
  background-color: ${props => props.theme.colors.divider};
  height: 1px;
  ${props => typeof props.imageURL === "string" && withImageURLDividerCss};
`;

const MoreOptionsIcon: React.FunctionComponent<{}> = () => (
  <svg
    width="23"
    height="5"
    viewBox="0 0 23 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.6">
      <circle cx="20.5" cy="2.5" r="2.5" fill="#1E2428" />
      <circle cx="11.5" cy="2.5" r="2.5" fill="#1E2428" />
      <circle cx="2.5" cy="2.5" r="2.5" fill="#1E2428" />
    </g>
  </svg>
);

const titleLineHeight = R.cond([
  [
    ({ cardHeight, imageURL }) =>
      cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(2),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(3),
  ],
  [({ imageURL }) => typeof imageURL === "string", R.always(2)],
]);

const contentLineHeight = R.cond([
  [
    ({ cardWidth, imageURL }) =>
      cardWidth > DEFAULT_CARD_WIDTH && typeof imageURL !== "string",
    R.always(4),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight <= DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(4),
  ],
  [
    ({ cardHeight, imageURL }) =>
      cardHeight > DEFAULT_CARD_HEIGHT && typeof imageURL !== "string",
    R.always(5),
  ],
  [({ imageURL }) => typeof imageURL === "string", R.always(3)],
]);

const calculateCardHeight = R.cond([
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== "string" &&
      cardHeight > DEFAULT_CARD_HEIGHT &&
      cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardHeight }) => cardHeight - DEFAULT_CARD_PADDING * 2,
  ],
  [
    ({ cardHeight, cardWidth, imageURL }) =>
      typeof imageURL !== "string" &&
      cardHeight === DEFAULT_CARD_HEIGHT &&
      cardWidth > DEFAULT_CARD_WIDTH,
    R.always(290 - DEFAULT_CARD_PADDING * 2),
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL === "string" && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL === "string" && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(290),
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL !== "string" && cardHeight > DEFAULT_CARD_HEIGHT,
    ({ cardHeight }) => cardHeight,
  ],
  [
    ({ cardHeight, imageURL }) =>
      typeof imageURL !== "string" && cardHeight === DEFAULT_CARD_HEIGHT,
    R.always(DEFAULT_CARD_HEIGHT),
  ],
]);

const calculateCardWidth = R.cond([
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL === "string" && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth,
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL === "string" && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL !== "string" && cardWidth > DEFAULT_CARD_WIDTH,
    ({ cardWidth }) => cardWidth,
  ],
  [
    ({ cardWidth, imageURL }) =>
      typeof imageURL !== "string" && cardWidth === DEFAULT_CARD_WIDTH,
    R.always(DEFAULT_CARD_WIDTH),
  ],
]);

interface IRenderDescriptionRowContentProps {
  content: string;
  cardHeight: number;
  imageURL: string | undefined;
}

const RenderDescriptionRowContent: React.FunctionComponent<
  IRenderDescriptionRowContentProps
> = ({ content, cardHeight, imageURL }) => {
  if (process.env.STORYBOOK !== "true") {
    const DescriptionRow = require("../../../kauri-web/components/common/DescriptionRow.js")
      .default;
    return React.createElement(
      DescriptionRow,
      { record: { text: content }, type: "article card", cardHeight, imageURL },
      null
    );
  } else {
    return null;
  }
};

const Header = styled.div`
  display: flex;
  > :first-child {
    margin-right: auto;
  }
`;

const MoreOptions = styled<{ hasImageURL: boolean }, "div">("div")`
  display: flex;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${props => (props.hasImageURL ? "180" : "10")}px;
  right: 15px;
  z-index: 5;
`;

interface ICardContentProps {
  title: string;
  content: string;
  cardHeight: number;
  cardWidth: number;
  imageURL: string | undefined;
  date: string;
  status: undefined | "PUBLISHED" | "DRAFT";
}

const RenderCardContent: React.FunctionComponent<ICardContentProps> = ({
  title,
  content,
  cardHeight,
  cardWidth,
  imageURL,
  date,
  status,
}) => (
  <React.Fragment>
    {typeof imageURL === "string" && (
      <Image cardHeight={cardHeight} imageURL={imageURL} />
    )}
    <Content imageURL={imageURL}>
      <Header>
        <Label>{(status === "DRAFT" ? "Drafted " : "Posted ") + date}</Label>
      </Header>
      <H1>
        <TextTruncate
          line={titleLineHeight({ cardHeight, imageURL })}
          truncateText="…"
          text={title}
        />
      </H1>
      {cardHeight <= 290 &&
      typeof imageURL === "string" ? null : content
          .substring(0, 2)
          .includes("{") ? (
        <RenderDescriptionRowContent
          content={content}
          cardHeight={cardHeight}
          imageURL={imageURL}
        />
      ) : (
        <BodyCard>
          <TextTruncate
            line={contentLineHeight({ cardHeight, cardWidth, imageURL })}
            truncateText="…"
            text={content}
          />
        </BodyCard>
      )}
    </Content>
  </React.Fragment>
);

interface IPublicProfileProps {
  username: string | null;
  userId: string;
  cardWidth: number;
  userAvatar: string | null;
}

const RenderPublicProfile: React.FunctionComponent<IPublicProfileProps> = ({
  username,
  userId,
  cardWidth,
  userAvatar,
}) => (
  <UserAvatar
    fullWidth={cardWidth > DEFAULT_CARD_WIDTH}
    username={username}
    userId={userId}
    avatar={userAvatar}
  />
);

const shiftMarginDueToNoImageURLCss = css`
  margin-top: -15px;
  margin-left: -15px;
`;

const HoverContainer = styled<{ hasImageURL: boolean }, "div">("div")`
  display: flex;
  height: 100%;
  width: 100%;
  z-index: 2;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => props.theme.colors.textPrimary};
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[2]}px;
  }
  ${props => !props.hasImageURL && shiftMarginDueToNoImageURLCss};
`;

interface IHoverProps {
  hasImageURL: boolean;
  hoverChildren: React.ReactElement<any>;
  cancelAction: () => void;
}

const Hover: React.FunctionComponent<IHoverProps> = ({
  hasImageURL,
  cancelAction,
  hoverChildren,
}) => (
  <HoverContainer hasImageURL={hasImageURL}>
    {hoverChildren}
    <SecondaryButton onClick={cancelAction}>Cancel</SecondaryButton>
  </HoverContainer>
);

interface IProps {
  id: string;
  version: number;
  content: string;
  date: string;
  title: string;
  username: string | null;
  userId: string;
  userAvatar: string | null;
  imageURL?: string;
  cardHeight: number;
  cardWidth?: number;
  linkComponent: (
    childrenProps: React.ReactElement<any>,
    route: string
  ) => React.ReactElement<any>;
  hoverChildren?: React.ReactElement<any>;
  isChosenArticle?: boolean;
  resourceType: "USER" | "COMMUNITY";
  status?: "PUBLISHED" | "DRAFT";
  isLoggedIn: boolean;
}

const ArticleCard: React.FunctionComponent<IProps> = ({
  id,
  version,
  content,
  date,
  title,
  username,
  userId,
  userAvatar,
  imageURL,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  linkComponent,
  isChosenArticle,
  resourceType,
  status,
  isLoggedIn,
  hoverChildren,
}) => {
  const [{ toggledOn }, dispatch] = React.useReducer<
    IToggleState,
    IToggleAction
  >(toggleReducer, toggleInitialState);

  return (
    <BaseCard
      imageURL={imageURL}
      cardWidth={calculateCardWidth({ cardWidth, imageURL })}
      cardHeight={calculateCardHeight({ cardHeight, cardWidth, imageURL })}
      isChosenArticle={isChosenArticle}
      toggledOn={toggledOn}
    >
      {!!hoverChildren && toggledOn === true && (
        <Hover
          hasImageURL={!!imageURL}
          cancelAction={hideDispatch(dispatch)}
          hoverChildren={hoverChildren}
        />
      )}
      <Container imageURL={imageURL}>
        {isLoggedIn && !!hoverChildren && (
          <MoreOptions
            hasImageURL={!!imageURL}
            onClick={toggleDispatch(dispatch)}
          >
            <MoreOptionsIcon />
          </MoreOptions>
        )}
        {linkComponent(
          <RenderCardContent
            title={title}
            content={content}
            cardHeight={cardHeight}
            cardWidth={cardWidth}
            imageURL={imageURL}
            date={date}
            status={status}
          />,
          `/article/${id}/v${version}`
        )}
        <Divider imageURL={imageURL} />
        <Footer imageURL={imageURL}>
          {linkComponent(
            <RenderPublicProfile
              username={username}
              userId={userId}
              cardWidth={calculateCardWidth({ cardWidth, imageURL })}
              userAvatar={userAvatar}
            />,
            resourceType === "COMMUNITY"
              ? `/community/${userId}`
              : `/public-profile/${userId}`
          )}
        </Footer>
      </Container>
    </BaseCard>
  );
};

export default ArticleCard;
