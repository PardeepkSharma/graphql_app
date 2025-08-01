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
