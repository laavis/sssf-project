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
    type: String
    message: String
  }
  type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
      rePassword: String!
    ): UserRegister
    loginUser(email: String!, password: String!): UserLogin
  }
  type UserLogin {
    token: String
    errors: [Error]
  }
`;
