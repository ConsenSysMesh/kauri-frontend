import React, { Component, Fragment } from "react";
import Head from "next/head";
import ArticleCard from "../../../../../kauri-components/components/Card/ArticleCard";
import { Link } from "../../../../routes";
import Loading from "../../../common/Loading";
import Masonry from "../../../../../kauri-components/components/Layout/Masonry";
import PrimaryButton from "../../../../../kauri-components/components/Button/PrimaryButton";
import AddToCollectionConnection from "../../../connections/AddToCollection";
import R from "ramda";
import {
  searchAutocompleteArticles_searchAutocomplete,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO,
  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO,
} from "../../../../queries/__generated__/searchAutocompleteArticles";
import {
  Article_owner_CommunityDTO,
  Article_owner_PublicUserDTO,
} from "../../../../queries/Fragments/__generated__/Article";

interface IProps {
  ArticlesQuery: {
    error: string;
    searchAutocomplete?: searchAutocompleteArticles_searchAutocomplete;
  };
  hostName: string;
  isLoggedIn: boolean;
  openModalAction: (payload: { children: React.ReactElement<any> }) => void;
  routeChangeAction(route: string): void;
}

class Articles extends Component<IProps> {
  render() {
    if (this.props.ArticlesQuery.error) {
      alert(this.props.ArticlesQuery.error);
      return null;
    } // TODO replace with an error message if exists

    const { searchAutocomplete } = this.props.ArticlesQuery;
    const { isLoggedIn, openModalAction } = this.props;
    return (
      <Fragment>
        <Head>
          <title>
            Beginner to Advanced Blockchain & Ethereum Tutorials | Articles -
            Kauri
          </title>
          <meta
            name="description"
            content="Discover the best blockchain related articles, tutorials and how-to guides"
          />
          <link
            rel="canonical"
            href={`https://${this.props.hostName}/articles`}
          />
        </Head>
        {searchAutocomplete &&
        searchAutocomplete.content &&
        searchAutocomplete.content.length > 0 ? (
          <Masonry>
            {searchAutocomplete.content.map(articleResult => {
              const article =
                articleResult &&
                (articleResult.resource as searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO);
              if (!article) {
                return <></>;
              }
              const owner =
                R.path<
                  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_CommunityDTO
                >(["owner"])(article) ||
                R.path<
                  searchAutocompleteArticles_searchAutocomplete_content_resource_ArticleDTO_owner_PublicUserDTO
                >(["owner"])(article);

              const ownerType =
                owner &&
                (owner.__typename.split("DTO")[0].toUpperCase() as
                  | "USER"
                  | "COMMUNITY");

              return (
                <ArticleCard
                  key={article.id || undefined}
                  date={article.datePublished}
                  tags={article.tags as string[]}
                  title={article.title || ""}
                  description={article.description || ""}
                  resourceType={ownerType || "USER"}
                  username={
                    (article.owner &&
                      (ownerType === "COMMUNITY"
                        ? (article.owner as Article_owner_CommunityDTO).name
                        : (article.owner as Article_owner_PublicUserDTO)
                            .username)) ||
                    null
                  }
                  userId={
                    owner
                      ? typeof owner.id === "string"
                        ? owner.id
                        : "Anoymous"
                      : "Anonymous"
                  }
                  userAvatar={(owner && owner.avatar) || null}
                  id={article.id || ""}
                  version={article.version || 1}
                  cardHeight={310}
                  imageURL={
                    article &&
                    article.attributes &&
                    article.attributes.background
                  }
                  isLoggedIn={isLoggedIn}
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
                  hoverChildren={() => (
                    <PrimaryButton
                      handleClick={() =>
                        openModalAction({
                          children: (
                            <AddToCollectionConnection
                              articleId={article.id || ""}
                              version={article.version || 1}
                            />
                          ),
                        })
                      }
                    >
                      Add to collection
                    </PrimaryButton>
                  )}
                />
              );
            })}
          </Masonry>
        ) : (
          <Loading />
        )}
      </Fragment>
    );
  }
}

export default Articles;
