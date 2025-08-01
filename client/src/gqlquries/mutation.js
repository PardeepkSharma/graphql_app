import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  #graphql
  mutation signUp($input: signUpInput!) {
    signUp(input: $input) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN = gql`
  #graphql
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      message
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation AddQuotes($quote: String!) {
    addQuotes(quote: $quote)
  }
`;
