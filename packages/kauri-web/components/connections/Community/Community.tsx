import * as React from "react";
import gql from "graphql-tag";
import moment from "moment";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import { Link } from "../../../routes";
import styled from "../../../lib/styled-components";
import CommunityProfile from "../../../../kauri-components/components/Community/CommunityProfile";
import ArticleCard from "../../../../kauri-components/components/Card/ArticleCard";
import Empty from "../../containers/PublicProfile/Empty";
import {
  searchCommunityArticles,
  searchCommunityArticlesVariables,
} from "./__generated__/searchCommunityArticles";
import { setNavcolorOverrideAction } from "../../../lib/Module";

const query = gql`
  query searchCommunityArticles($category: String) {
    searchArticles(
      filter: {
        statusIn: [PUBLISHED]
        latestVersion: true
        ownerEquals: $category
      }
    ) {
      content {
        id
        version
        title
        content
        dateCreated
        datePublished
        author {
          id
          name
          avatar
          username
        }
        status
        attributes
        contentHash
        checkpoint
        vote {
          totalVote
        }
        comments {
          content {
            posted
            author {
              id
              name
              avatar
              username
            }
            body
          }
          totalPages
          totalElements
        }
        resourceIdentifier {
          type
          id
          version
        }
      }
      totalPages
      totalElements
    }
  }
`;

const CommunityHeader = styled.section`
  display: flex;
  height: 255px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.textPrimary};
  padding: 0px ${props => props.theme.padding};
`;

const ArticlesSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex: 1;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding: 0px ${props => props.theme.padding};
  > div {
    margin: ${props => props.theme.space[2]}px;
  }
`;

interface IProps {
  avatar: null | string;
  category: string;
  hostName: string;
  id: string;
  isLoggedIn: boolean;
  name: string;
  website: string | null;
}

const Container: React.SFC<IProps> = ({
  avatar,
  category,
  hostName,
  isLoggedIn,
  id,
  name,
  website,
}) => {
  return (
    <section>
      <CommunityHeader>
        <CommunityProfile
          id={id}
          avatar={avatar}
          name={name}
          website={website}
          hostName={hostName}
        />
      </CommunityHeader>
      <Query<searchCommunityArticles, searchCommunityArticlesVariables>
        query={query}
        variables={{ category }}
      >
        {queryProps => {
          if (queryProps.loading) {
            return <Loading />;
          }
          if (queryProps.error) {
            // console.log(queryProps.error);
            return (
              <ErrorMessage
                setNavcolorOverrideAction={setNavcolorOverrideAction}
                data={{ error: { message: queryProps.error.message } }}
              />
            );
          }
          if (queryProps.data) {
            if (
              queryProps.data.searchArticles &&
              queryProps.data.searchArticles.content
            ) {
              const linkComponent = (
                childrenProps: React.ReactElement<any>,
                route: string
              ) => (
                <Link useAnchorTag={true} href={route}>
                  {childrenProps}
                </Link>
              );
              return (
                <ArticlesSection>
                  {queryProps.data.searchArticles.content.map(
                    article =>
                      article && (
                        <ArticleCard
                          key={String(article.id)}
                          id={String(article.id)}
                          version={Number(article.version)}
                          cardHeight={420}
                          imageURL={
                            article.attributes && article.attributes.background
                          }
                          linkComponent={linkComponent}
                          title={String(article.title)}
                          content={String(article.content)}
                          date={`${moment(article.datePublished).fromNow()}`}
                          username={name}
                          userAvatar={avatar}
                          userId={id}
                          isLoggedIn={isLoggedIn}
                          resourceType="COMMUNITY"
                        />
                      )
                  )}
                </ArticlesSection>
              );
            } else {
              return (
                <ArticlesSection>
                  <Empty />
                </ArticlesSection>
              );
            }
          }
        }}
      </Query>
    </section>
  );
};

export default Container;
