import React from "react";
import styled from "styled-components";
import { homepageContentQuery as query } from "../../../queries/Homepage";
import {
  homepageContent,
  homepageContentVariables,
} from "../../../queries/__generated__/homepageContent";
import { Query } from "react-apollo";
import Loading from "../../common/Loading";
import { ErrorMessage } from "../../../lib/with-apollo-error";
import SignupBanner from "../../../../kauri-components/components/SignupBanner";
import PublishYourOwnContentCTA from "../../../../kauri-components/components/PublishYourOwnContentCTA";
import TopTags from "../../../../kauri-components/components/TopTags";
import TopContributors from "../../../../kauri-components/components/TopContributors";
import FeaturedContent from "../../../../kauri-components/components/FeaturedContent";
import LatestContent from "../../../../kauri-components/components/LatestContent";
import NewsletterBanner from "../../../../kauri-components/components/NewsletterBanner";
import ImportYourContentBanner from "../../../../kauri-components/components/ImportYourContentBanner";
import FeaturedResource from "../../../../kauri-components/components/FeaturedResource";
import CuratedCategory, {
  CuratedCategoriesSection,
} from "../../../../kauri-components/components/CuratedCategory";
import { Link } from "../../../routes";
import { IShowNotificationPayload } from "../../../lib/Module";
import Head from "next/head";
// import mockData from "./mock";

const HomePageSection = styled.section`
  display: flex;
  flex-direction: column;
  > :nth-last-child(2),
  > :last-child {
    margin-bottom: 0px;
  }
`;

const HomePageRow = styled<{ padContent: boolean }, "section">("section")`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => props.theme.space[3]}px;
  > :not(:last-child) {
    margin-right: ${props => props.theme.space[3]}px;
  }
  ${props => props.padContent && props.theme.padContent};
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    flex-direction: column;
    > :not(:last-child) {
      margin-right: 0px;
    }
  }
`;

const SideRow = styled.section`
  display: flex;
  flex-direction: column;
  > :not(:last-child) {
    margin-bottom: ${props => props.theme.space[3]}px;
  }
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    display: none;
  }
`;

interface IProps {
  setNavcolorOverrideAction: any;
  isLoggedIn: boolean;
  data: {
    searchArticles?: {
      content: Array<[]>;
    };
    getAllCuratedList: Array<[]>;
  };
  hostName: string;
  routeChangeAction: (route: string) => void;
  emailSubscribeAction: (emailAddress: string) => void;
  showNotificationAction: (payload: IShowNotificationPayload) => void;
}

const HomePageComponent: React.FunctionComponent<IProps> = props => {
  return (
    <Query<homepageContent, homepageContentVariables>
      query={query}
      variables={{}}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return (
            <ErrorMessage
              data={{ error: { message: error.message } }}
              setNavcolorOverrideAction={props.setNavcolorOverrideAction}
            />
          );
        }
        if (
          data &&
          data.getLatestHomepageDescriptor &&
          data.getLatestHomepageDescriptor.rows
        ) {
          // const data = mockData.data;
          // console.log(data.getLatestHomepageDescriptor);

          return (
            <HomePageSection>
              <Head>
                <title>
                  Beginner to Advanced Blockchain & Ethereum Tutorials - Kauri
                </title>
                <meta property="og:url" content="https://kauri.io" />
                <meta
                  property="og:image"
                  content="https://api.kauri.io:443/ipfs/QmRVCyQ3ng5AWGmjodzXcxg1LK9CRvePmd6ciDXY1mLofY"
                />
                <meta
                  name="description"
                  content={
                    "Learn Blockchain and Ethereum with Kauri, Articles, Tutorials, Guides, Documentation and Best Practices. Focused on Getting Started, Scaling, Privacy, Storage, Defi, Gaming, UX and much more."
                  }
                />
                <link rel="canonical" href={`https://kauri.io`} />
              </Head>

              {!props.isLoggedIn && (
                <SignupBanner
                  linkComponent={(children, route) => (
                    <Link href={route}>{children}</Link>
                  )}
                />
              )}

              {data.getLatestHomepageDescriptor.rows.map((row, index) => {
                return (
                  <HomePageRow
                    key={index}
                    padContent={Boolean(row && row.main && row.sidebar)}
                  >
                    {row &&
                      row.main &&
                      row.main.map(mainRow => {
                        if (mainRow) {
                          switch (mainRow.__typename) {
                            case "Categories": {
                              if (mainRow.content) {
                                return (
                                  <CuratedCategoriesSection
                                    key={String(mainRow.type)}
                                  >
                                    {mainRow.content.map(
                                      (category, categoryIndex) =>
                                        category && (
                                          <CuratedCategory
                                            key={`${
                                              category.name
                                            }-${categoryIndex}`}
                                            background={category.image}
                                            linkComponent={children => (
                                              <Link
                                                fullWidth={true}
                                                useAnchorTag={true}
                                                href={category.link}
                                              >
                                                {children}
                                              </Link>
                                            )}
                                            category={String(category.name)}
                                            description={String(
                                              category.description
                                            )}
                                          />
                                        )
                                    )}
                                  </CuratedCategoriesSection>
                                );
                              }
                            }

                            case "Featured": {
                              if (mainRow.content) {
                                return (
                                  <FeaturedContent
                                    Link={Link}
                                    content={mainRow.content}
                                  />
                                );
                              }
                            }

                            case "Promo": {
                              if (mainRow.__typename === "Promo") {
                                if (
                                  mainRow.content &&
                                  mainRow.content.length > 0
                                ) {
                                  const resource = mainRow.content.map(
                                    (content: any) => {
                                      if (content !== null) {
                                        return content.resource;
                                      }
                                    }
                                  );

                                  // console.log(resource[0]);

                                  return (
                                    <FeaturedResource
                                      {...resource[0]}
                                      {...resource[0].owner}
                                      id={resource[0].id}
                                      userId={resource[0].owner.id}
                                      resourceType={resource[0].resourceIdentifier.type.toLowerCase()}
                                      ownerResourceType={resource[0].owner.resourceIdentifier.type.toLowerCase()}
                                      linkComponent={(children, route) => (
                                        <Link useAnchorTag={true} route={route}>
                                          {children}
                                        </Link>
                                      )}
                                    />
                                  );
                                }
                              }
                            }

                            case "LatestContent": {
                              if (mainRow.__typename === "LatestContent") {
                                if (
                                  mainRow.content &&
                                  mainRow.content.length > 0
                                ) {
                                  const content = mainRow.content;
                                  return (
                                    <LatestContent
                                      content={content}
                                      Link={Link}
                                      linkComponent={(children, route) => (
                                        <Link useAnchorTag={true} route={route}>
                                          {children}
                                        </Link>
                                      )}
                                    />
                                  );
                                }
                              }
                            }

                            case "Newsletter": {
                              if (mainRow.__typename === "Newsletter") {
                                return (
                                  <NewsletterBanner
                                    handleSubmit={emailAddress =>
                                      props.emailSubscribeAction(emailAddress)
                                    }
                                    handleError={() => {
                                      props.showNotificationAction({
                                        description:
                                          "Please enter a valid email address!",
                                        message: "Invalid Email address",
                                        notificationType: "error",
                                      });
                                    }}
                                  />
                                );
                              }
                            }

                            case "Import": {
                              if (mainRow.__typename === "Import") {
                                return <ImportYourContentBanner />;
                              }
                            }

                            default: {
                              return <p>Main row type needs implementing</p>;
                            }
                          }
                        }
                      })}
                    {row &&
                      row.sidebar &&
                      // Filter out latestcontent sidebar
                      row.sidebar.find(sideBar =>
                        sideBar ? sideBar.__typename !== "LatestContent" : false
                      ) && (
                        <SideRow>
                          {row &&
                            row.sidebar &&
                            row.sidebar.map(sideBar => {
                              if (sideBar) {
                                switch (sideBar.__typename) {
                                  case "Actions": {
                                    return (
                                      <PublishYourOwnContentCTA
                                        isLoggedIn={props.isLoggedIn}
                                        key={sideBar.__typename}
                                        linkComponent={(children, route) => (
                                          <Link
                                            useAnchorTag={true}
                                            href={route}
                                          >
                                            {children}
                                          </Link>
                                        )}
                                        content={sideBar.content}
                                      />
                                    );
                                  }

                                  case "TopTags": {
                                    if (sideBar.content) {
                                      const tags = sideBar.content.map(
                                        tag => (tag && tag.name) || ""
                                      );

                                      return (
                                        <TopTags
                                          key={"top tags"}
                                          routeChangeAction={
                                            props.routeChangeAction
                                          }
                                          tags={tags as string[]}
                                        />
                                      );
                                    }
                                  }

                                  case "TopContributors": {
                                    if (
                                      sideBar.content &&
                                      sideBar.__typename === "TopContributors"
                                    ) {
                                      if (sideBar.content) {
                                        const contributors = sideBar.content.map(
                                          contributor =>
                                            (contributor &&
                                              contributor.user && {
                                                avatar: contributor.user.avatar,
                                                userId: String(
                                                  contributor.user.id
                                                ),
                                                username:
                                                  contributor.user.username,
                                              }) || {
                                              avatar: "",
                                              userId: "",
                                              username: "",
                                            }
                                        );

                                        return (
                                          <TopContributors
                                            key={"top contributors"}
                                            linkComponent={(
                                              children,
                                              route
                                            ) => (
                                              <Link
                                                key={route}
                                                useAnchorTag={true}
                                                href={route}
                                              >
                                                {children}
                                              </Link>
                                            )}
                                            contributors={contributors}
                                          />
                                        );
                                      }
                                    }
                                  }

                                  case "LatestContent": {
                                    return null;
                                  }

                                  default: {
                                    return null;
                                  }
                                }
                              }
                            })}
                        </SideRow>
                      )}
                  </HomePageRow>
                );
              })}
            </HomePageSection>
          );
        } else {
          return null;
        }
      }}
    </Query>
  );
};

export default HomePageComponent;
