/* tslint:disable */
// This file was automatically generated and should not be edited.

import { ArticleStatus, ResourceType } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: searchPersonalSubmittedArticles
// ====================================================

export interface searchPersonalSubmittedArticles_searchArticles_content_vote {
  __typename: "VoteStatDTO";
  totalVote: any | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_owner_ArticleDTO {
  __typename: "ArticleDTO" | "CommentDTO" | "CommunityMemberDTO" | "CuratedListDTO" | "CollectionDTO" | "SearchResultDTO" | "UserDTO";
}

export interface searchPersonalSubmittedArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_owner_PublicUserDTO {
  __typename: "PublicUserDTO";
  id: string | null;
  username: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchPersonalSubmittedArticles_searchArticles_content_owner_PublicUserDTO_resourceIdentifier | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_owner_CommunityDTO {
  __typename: "CommunityDTO";
  id: string | null;
  name: string | null;
  avatar: string | null;
  resourceIdentifier: searchPersonalSubmittedArticles_searchArticles_content_owner_CommunityDTO_resourceIdentifier | null;
}

export type searchPersonalSubmittedArticles_searchArticles_content_owner = searchPersonalSubmittedArticles_searchArticles_content_owner_ArticleDTO | searchPersonalSubmittedArticles_searchArticles_content_owner_PublicUserDTO | searchPersonalSubmittedArticles_searchArticles_content_owner_CommunityDTO;

export interface searchPersonalSubmittedArticles_searchArticles_content_comments_content_author {
  __typename: "PublicUserDTO";
  id: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_comments_content {
  __typename: "CommentDTO";
  author: searchPersonalSubmittedArticles_searchArticles_content_comments_content_author | null;
  posted: any | null;
  body: string | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_comments {
  __typename: "ResponsePage_CommentDTO";
  content: (searchPersonalSubmittedArticles_searchArticles_content_comments_content | null)[] | null;
  totalPages: number | null;
  totalElements: any | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content_resourceIdentifier {
  __typename: "ResourceIdentifier";
  id: string | null;
  type: ResourceType | null;
  version: number | null;
}

export interface searchPersonalSubmittedArticles_searchArticles_content {
  __typename: "ArticleDTO";
  id: string | null;
  version: number | null;
  title: string | null;
  content: string | null;
  authorId: string | null;
  dateCreated: any | null;
  datePublished: any | null;
  status: ArticleStatus | null;
  attributes: any | null;
  contentHash: string | null;
  checkpoint: string | null;
  vote: searchPersonalSubmittedArticles_searchArticles_content_vote | null;
  author: searchPersonalSubmittedArticles_searchArticles_content_author | null;
  owner: searchPersonalSubmittedArticles_searchArticles_content_owner | null;
  comments: searchPersonalSubmittedArticles_searchArticles_content_comments | null;
  resourceIdentifier: searchPersonalSubmittedArticles_searchArticles_content_resourceIdentifier | null;
}

export interface searchPersonalSubmittedArticles_searchArticles {
  __typename: "ResponsePage_ArticleDTO";
  content: (searchPersonalSubmittedArticles_searchArticles_content | null)[] | null;
}

export interface searchPersonalSubmittedArticles {
  searchArticles: searchPersonalSubmittedArticles_searchArticles | null;
}

export interface searchPersonalSubmittedArticlesVariables {
  size?: number | null;
  userId?: string | null;
}
