import R from "ramda";
import * as React from "react";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import Empty from "../PublicProfile/Empty";
import {
  Title2,
  PageDescription,
} from "../../../../kauri-components/components/Typography";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import PrimaryButton from "../../../../kauri-components/components/Button/PrimaryButton";
import AddToCollectionConnection from "../../connections/AddToCollection/index";
import {
  Article,
  Article_owner_PublicUserDTO,
  Article_owner_CommunityDTO,
} from "../../../queries/Fragments/__generated__/Article";
import {
  Collection,
  Collection_owner_PublicUserDTO,
} from "../../../queries/Fragments/__generated__/Collection";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const ResourcesSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: wrap;
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

const StyledTitle = styled(Title2)`
  margin-top: ${props => props.theme.space[3]}px;
`;

const StyledDescription = styled(PageDescription)`
  margin-bottom: ${props => props.theme.space[3]}px;
`;

interface IProps {
  resources: [Article | Collection];
  currentUser: string | null;
  description: string | null;
  isLoggedIn: boolean;
  isOwnedByCurrentUser: boolean;
  name: string;
  openModalAction: any;
}

const CollectionSection: React.SFC<IProps> = props => {
  const {
    name,
    description,
    resources,
    isLoggedIn,
    openModalAction,
    isOwnedByCurrentUser,
  } = props;
  if (resources) {
    return (
      <Container>
        <StyledTitle>{name}</StyledTitle>
        <StyledDescription>{description}</StyledDescription>
        <ResourcesSection>
          {resources.map(resource => {
            const owner = resource.owner as
              | Article_owner_PublicUserDTO
              | Article_owner_CommunityDTO;

            if (resource.__typename === "ArticleDTO") {
              const article = resource;
              const ownerType =
                owner &&
                (owner.__typename.split("DTO")[0].toUpperCase() as
                  | "USER"
                  | "COMMUNITY");

              function getContributorOrOwnerField<T>(field: string) {
                return R.path<T>(["contributors", "0"])(article)
                  ? R.path<T>(["contributors", "0", field])(article)
                  : R.path<T>(["owner", field])(article);
              }

              return (
                <ArticleCard
                  key={String(article.id)}
                  id={String(article.id)}
                  version={Number(article.version)}
                  description={article.description}
                  date={article.datePublished}
                  title={String(article.title)}
                  username={
                    (getContributorOrOwnerField<string>("username") ||
                    ownerType === "COMMUNITY"
                      ? getContributorOrOwnerField<string>("name")
                      : getContributorOrOwnerField<string>("username")) || null
                  }
                  userId={getContributorOrOwnerField<string>("id") || ""}
                  userAvatar={
                    getContributorOrOwnerField<string>("avatar") || null
                  }
                  resourceType={
                    (R.path<{}>(["contributors", "0"])(article)
                      ? "USER"
                      : ownerType) || "USER"
                  }
                  tags={article.tags as string[]}
                  imageURL={
                    (article.attributes &&
                      typeof article.attributes.background === "string" &&
                      article.attributes.background) ||
                    null
                  }
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={
                        route && route.includes("article") && article.title
                      }
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  cardHeight={310}
                  isLoggedIn={isLoggedIn}
                  hoverChildren={
                    isOwnedByCurrentUser
                      ? null
                      : () => (
                          <PrimaryButton
                            onClick={() =>
                              openModalAction({
                                children: (
                                  <AddToCollectionConnection
                                    articleId={String(article.id)}
                                    version={Number(article.version)}
                                  />
                                ),
                              })
                            }
                          >
                            Add To Collection
                          </PrimaryButton>
                        )
                  }
                />
              );
            } else if (resource.__typename === "CollectionDTO") {
              const collection = resource;
              const articleCount =
                collection.sections &&
                collection.sections.reduce((current, next) => {
                  if (next && Array.isArray(next.resources)) {
                    const articlesInSection = next.resources.filter(
                      sectionResource =>
                        sectionResource &&
                        sectionResource.__typename
                          .toLowerCase()
                          .includes("article")
                    );
                    current += articlesInSection.length;
                  }
                  return current;
                }, 0);

              const collectionCount =
                collection.sections &&
                collection.sections.reduce((current, next) => {
                  if (next && Array.isArray(next.resources)) {
                    const collectionsInSection = next.resources.filter(
                      sectionResource =>
                        sectionResource &&
                        sectionResource.__typename
                          .toLowerCase()
                          .includes("collection")
                    );
                    current += collectionsInSection.length;
                  }
                  return current;
                }, 0);

              const ownerResource =
                collection.owner &&
                collection.owner.__typename === "PublicUserDTO"
                  ? {
                      avatar: collection.owner.avatar,
                      id: collection.owner.id || "not_found",
                      type: "USER",
                      username: collection.owner.username,
                    }
                  : collection.owner &&
                    collection.owner.__typename === "CommunityDTO"
                  ? {
                      avatar: collection.owner.avatar,
                      id: collection.owner.id || "not_found",
                      type: "COMMUNITY",
                      username: collection.owner.name,
                    }
                  : {
                      avatar: "",
                      id: "",

                      username: "",
                    };

              return (
                <CollectionCard
                  key={String(collection.id)}
                  id={String(collection.id)}
                  articleCount={String(articleCount)}
                  collectionCount={String(collectionCount)}
                  description={
                    collection.description ? collection.description : ""
                  }
                  date={collection.dateUpdated}
                  name={collection.name ? collection.name : ""}
                  userId={String(
                    collection.owner &&
                      (collection.owner as Collection_owner_PublicUserDTO).id
                  )}
                  username={
                    collection.owner &&
                    (collection.owner as Collection_owner_PublicUserDTO).name
                  }
                  userAvatar={
                    collection.owner &&
                    (collection.owner as Collection_owner_PublicUserDTO).avatar
                  }
                  imageURL={collection.background}
                  linkComponent={(
                    childrenProps: React.ReactElement<any>,
                    route: string
                  ) => (
                    <Link
                      toSlug={
                        route &&
                        route.includes("collection") &&
                        collection &&
                        collection.name
                      }
                      useAnchorTag={true}
                      href={route}
                    >
                      {childrenProps}
                    </Link>
                  )}
                  cardHeight={310}
                  resourceType={ownerResource.type || "USER"}
                />
              );
            }
            return null;
          })}
        </ResourcesSection>
      </Container>
    );
  }
  return <Empty />;
};

export default CollectionSection;
