import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
  }
  type UserRegister {
    email: String!
    username: String!
    password: String!
    rePassword: String!
  }
  type Error {
    path: String!
    message: String!
  }
  type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
      rePassword: String!
    ): [Error!]
  }
`;
