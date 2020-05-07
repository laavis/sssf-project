import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Exercise {
    id: ID!
    name: String
    type: String
    difficulty: String
    target: String!
  }
  extend type Query {
    getAll: [Exercise]
    getOne(id: ID!): Exercise
    testAuth(asd: String): String
    create(name: String!, type: String, difficulty: String, target: String!): Exercise
    update(id: ID!, name: String!, type: String, difficulty: String, target: String!): Exercise
  }
`;
