import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import CollectionCard from "../../../../kauri-components/components/Card/CollectionCard";
import { Link } from "../../../routes";
import {
  Community_approved_CollectionDTO,
  Community_approved_ArticleDTO,
} from "../../../queries/Fragments/__generated__/Community";
import Masonry from "../../../../kauri-components/components/Layout/Masonry";

interface IProps {
  resources: any;
  communityId?: string;
}

const DisplayResources = ({ resources, communityId }: IProps) => (
  <Masonry>
    {resources.map(
      (i: Community_approved_ArticleDTO | Community_approved_CollectionDTO) => {
        const owner =
          i.owner && i.owner.__typename === "PublicUserDTO"
            ? {
                avatar: i.owner.avatar,
                id: i.owner.id || "not_found",
                type: "User",
                username: i.owner.username,
              }
            : i.owner && i.owner.__typename === "CommunityDTO"
            ? {
                avatar: i.owner.avatar,
                id: i.owner.id || "not_found",
                type: "Community",
                username: i.owner.name,
              }
            : {
                avatar: "",
                id: "",

                username: "",
              };
        if (i.__typename === "ArticleDTO") {
          return (
            <ArticleCard
              key={String(i.id)}
              id={String(i.id)}
              version={Number(i.version)}
              description={i.description}
              date={i.datePublished}
              title={String(i.title)}
              imageURL={i.attributes && i.attributes.background}
              cardHeight={310}
              cardWidth={288}
              username={owner.username}
              userId={owner.id}
              userAvatar={owner.avatar}
              isLoggedIn={false}
              nfts={i.associatedNfts}
              resourceType={owner.type as "USER" | "COMMUNITY"}
              linkComponent={(
                childrenProps: React.ReactElement<any>,
                route: string
              ) => (
                <Link
                  useAnchorTag={true}
                  href={
                    communityId
                      ? `${route}?proposed-community-id=${communityId}`
                      : route
                  }
                >
                  {childrenProps}
                </Link>
              )}
            />
          );
        } else if (i.__typename === "CollectionDTO") {
          const counter =
            i.sections &&
            i.sections.reduce(
              (sum, section) => {
                if (!section || !section.resources) {
                  return sum;
                } else {
                  const resArticleCount =
                    section.resources.filter(
                      res => res && res.__typename === "ArticleDTO"
                    ).length || 0;
                  const resCollectionCount =
                    section.resources.filter(
                      res => res && res.__typename === "CollectionDTO"
                    ).length || 0;
                  sum.articles += resArticleCount;
                  sum.collections += resCollectionCount;
                  return sum;
                }
              },
              {
                articles: 0,
                collections: 0,
              }
            );

          return (
            <CollectionCard
              key={String(i.id)}
              id={String(i.id)}
              description={i.description || ""}
              date={i.dateUpdated}
              name={i.name || ""}
              username={owner.username}
              userId={owner.id}
              userAvatar={owner.avatar}
              imageURL={i.background}
              articleCount={counter ? counter.articles.toString() : "0"}
              collectionCount={counter ? counter.collections.toString() : "0"}
              cardHeight={310}
              linkComponent={(
                childrenProps: React.ReactElement<any>,
                route: string
              ) => (
                <Link
                  useAnchorTag={true}
                  href={
                    communityId
                      ? `${route}?proposed-community-id=${communityId}`
                      : route
                  }
                >
                  {childrenProps}
                </Link>
              )}
            />
          );
        } else {
          return null;
        }
      }
    )}
  </Masonry>
);

export default DisplayResources;
