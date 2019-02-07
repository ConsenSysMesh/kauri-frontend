import * as React from "react";
import moment from "moment";
import styled from "../../lib/styled-components";
import {
  Title1,
  Label,
  PageDescription,
} from "../../../kauri-components/components/Typography";
import ShareArticle from "../../../kauri-components/components/Tooltip/ShareArticle";
import UserAvatar from "../../../kauri-components/components/UserAvatar";
import PrimaryButton from "../../../kauri-components/components/Button/PrimaryButton";
import { TagList } from "../Tags";

const CollectionHeaderSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 1;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: ${props => props.theme.space[1]}px;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  color: white;
  > :nth-child(2) {
    margin-top: ${props => props.theme.space[1]}px;
  }
  > :last-child {
    margin-top: ${props => props.theme.space[2]}px;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > :first-child {
    margin-bottom: ${props => props.theme.space[1]}px;
  }
  > button:last-child {
    margin-top: ${props => props.theme.space[3]}px;
  }
`;

const changeRoute = (
  routeChangeAction: (route: string) => void,
  id: string
) => () => routeChangeAction(`/collection/${id}/update-collection`);

interface IProps {
  description: string;
  id: string;
  imageURL: string | null;
  linkComponent: any;
  name: string;
  ownerId: string;
  routeChangeAction: any;
  tags: string[];
  updated: string;
  url: string;
  userAvatar: string | null;
  userId: string;
  username: string | null;
}

const Container: React.SFC<IProps> = props => {
  const {
    description,
    id,
    linkComponent,
    name,
    ownerId,
    updated,
    url,
    userAvatar,
    username,
    userId,
    routeChangeAction,
    imageURL,
    tags,
  } = props;
  return (
    <CollectionHeaderSection>
      <LeftSide>
        <Label>Collection Updated {moment(updated).fromNow()}</Label>
        <Title1 color="white">{name}</Title1>
        <PageDescription color="white">{description}</PageDescription>
        {tags && <TagList color={"white"} maxTags={5} tags={tags} />}
        <ShareArticle color={"white"} url={url} title={name} />
      </LeftSide>
      <RightSide>
        <Label color="white">Curator</Label>
        {linkComponent ? (
          linkComponent(
            <UserAvatar
              cardType={"COLLECTION"}
              imageURL={imageURL}
              variant="white"
              fullWidth={true}
              username={username}
              avatar={userAvatar}
              userId={ownerId}
            />
          )
        ) : (
          <UserAvatar
            imageURL={imageURL}
            cardType={"COLLECTION"}
            variant="white"
            username={username}
            avatar={userAvatar}
            fullWidth={true}
            userId={ownerId}
          />
        )}
        {userId === ownerId ? (
          <PrimaryButton onClick={changeRoute(routeChangeAction, id)}>
            Update Collection
          </PrimaryButton>
        ) : null}
      </RightSide>
    </CollectionHeaderSection>
  );
};

export default Container;
