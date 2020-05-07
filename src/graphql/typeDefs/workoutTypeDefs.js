import { gql } from 'apollo-server-express';
import { Exercise } from './exerciseTypeDefs';

export const typeDefs = gql`
  type Workout {
    name: String!
    difficulty: String
    category: String
    target: String!
    createdBy: ID
    exercises: [Exercise]!
  }
  extend type Query {
    getAllWorkouts: [Workout]
    getOneWorkout(id: ID): Workout
    createWorkout(
      name: String!
      difficulty: String
      category: String
      target: String!
      createdBy: ID
      exercises: [Exercise]!
    ): Workout
  }
`;
