export const typeDefs = `#graphql
  type Query {
    getAllUser: [User]
    getUser:User
    getQuotes:[Quote]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email:String!
    password:String!
    quotes:[Quote!]
  }
  type Quote {
    _id: ID!
    quote:String!
    user:User!
  }

  

  type LoginResponse{
    access_token:String,
    message:String
  }

input signUpInput{
  firstName:String
  lastName:String
  email:String
  password:String
}
  type Mutation{
    signUp(input:signUpInput!):User
    login(email:String!,password:String!):LoginResponse
    addQuotes(quote:String):String
  }
 
`;
