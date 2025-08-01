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
  query getUser {
    getUser {
      firstName
      lastName
      email
      quotes {
        quote
      }
    }
  }
`;
