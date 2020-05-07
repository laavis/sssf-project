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
    getAllExercises: [Exercise]
    getOneExercise(id: ID!): Exercise
    createExercise(name: String!, type: String, difficulty: String, target: String!): Exercise
    updateExercise(
      id: ID!
      name: String!
      type: String
      difficulty: String
      target: String!
    ): Exercise
    deleteExercise(id: ID!): String
  }
`;
