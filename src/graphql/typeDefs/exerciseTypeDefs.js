import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Exercise {
    id: ID!
    name: String
    type: String
    difficulty: String
    target: String!
  }
  input ExerciseInput {
    id: ID!
  }
  extend type Query {
    getExercises: [Exercise]
    getExercise(id: ID!): Exercise
  }
  extend type Mutation {
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
