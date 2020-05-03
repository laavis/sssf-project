import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }
  type Mutation {
    register(email: String!, username: String!, password: String!, rePassword: String!): Boolean!
    login(email: String!, password: String!): User
  }
`;
