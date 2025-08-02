import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  #graphql
  query GetQuotes {
    getQuotes {
      quote
      user {
        _id
        email
        firstName
      }
    }
  }
`;

export const GET_MY_PROFILE = gql`
  query getMyProfile {
    getMyProfile {
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;
export const GET_USER = gql`
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;
