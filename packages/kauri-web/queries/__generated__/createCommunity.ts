/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCommunity
// ====================================================

export interface createCommunity_createCommunity {
  __typename: "MutationResponse";
  hash: string | null;
}

export interface createCommunity {
  createCommunity: createCommunity_createCommunity | null;
}

export interface createCommunityVariables {
  name?: string | null;
  description?: string | null;
  avatar?: string | null;
  website?: string | null;
  tags?: (string | null)[] | null;
  social?: any | null;
  attributes?: any | null;
}
