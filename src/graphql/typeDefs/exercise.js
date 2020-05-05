import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Exercise {
    name: String!
    type: String
    difficulty: String
    target: String!
  }
  extend type Query {
    testAuth(asd: String): String
    create(name: String!, type: String, difficulty: String, target: String!): Exercise
  }
`;
