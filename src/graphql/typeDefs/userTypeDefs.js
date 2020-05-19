import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
  extend type Mutation {
    register(email: String!, username: String!, password: String!, rePassword: String!): User
    login(email: String!, password: String!): User
  }
`;
