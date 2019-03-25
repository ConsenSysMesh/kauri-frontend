import gql from "graphql-tag";
import { UserOwner } from "./User";

export const CommunityOwner = gql`
  fragment CommunityOwner on CommunityDTO {
    id
    name
    avatar
    resourceIdentifier {
      id
      type
    }
  }
`;

export const getCommunity = gql`
  query getCommunity($id: String) {
    getCommunity(id: $id) {
      id
      dateCreated
      dateUpdated
      creatorId
      creator {
        id
        username
        name
      }
      name
      description
      status
      website
      avatar
      social
      tags
      attributes
      members {
        id
        name
        avatar
        status
        role
      }
      approvedId {
        id
        type
      }
      pendingId {
        id
        type
      }
      approved {
        ... on ArticleDTO {
          version
          title
          content
          dateCreated
          datePublished
          author {
            id
            name
          }
          status
          attributes
        }

        ... on CollectionDTO {
          id
          name
          description
          tags
          background
          dateUpdated
          owner {
            ...UserOwner
            ...CommunityOwner
          }
        }
      }
      pending {
        ... on ArticleDTO {
          version
          title
          content
          dateCreated
          datePublished
          author {
            id
            name
          }
          status
          attributes
        }

        ... on CollectionDTO {
          id
          name
          description
          tags
          background
          dateUpdated
          owner {
            ...UserOwner
            ...CommunityOwner
          }
        }
      }
    }
  }
  ${UserOwner}
  ${CommunityOwner}
`;

export const getAllCommunities = gql`
  query searchCommunities(
    $size: Int = 12
    $page: Int = 0
    $filter: CommunityFilterInput
    $sort: String = "dateUpdated"
    $dir: DirectionInput = DESC
  ) {
    searchCommunities(
      size: $size
      page: $page
      filter: $filter
      sort: $sort
      dir: $dir
    ) {
      content {
        id
        dateCreated
        dateUpdated
        creatorId
        name
        description
        status
        website
        avatar
        tags
        social
        approvedId {
          type
        }
      }
      isLast
    }
  }
`;

export const createCommunityMutation = gql`
  mutation createCommunity(
    $name: String
    $description: String
    $avatar: String
    $website: String
    $tags: [String]
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    createCommunity(
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
      tags: $tags
    ) {
      hash
    }
  }
`;

export const updateCommunityMutation = gql`
  mutation updateCommunity(
    $id: String
    $name: String
    $description: String
    $avatar: String
    $website: String
    $tags: [String]
    $social: Map_String_StringScalar
    $attributes: Map_String_StringScalar
  ) {
    createCommunity(
      id: $id
      name: $name
      description: $description
      avatar: $avatar
      website: $website
      social: $social
      attributes: $attributes
      tags: $tags
    ) {
      hash
    }
  }
`;
