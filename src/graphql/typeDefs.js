import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String!
  }
  type UserRegister {
    token: String
    errors: [Error]
  }
  type Error {
    message: String
  }
  type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
      rePassword: String!
    ): UserRegister
  }
`;
