import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Workout {
    id: ID
    name: String!
    difficulty: String
    category: String
    target: String!
    createdBy: ID
    exercises: [Exercise]!
  }
  extend type Query {
    getWorkouts: [Workout]
    getWorkout(id: ID): Workout
  }
  extend type Mutation {
    createWorkout(
      name: String!
      difficulty: String
      category: String
      target: String!
      createdBy: ID
      exercises: [ExerciseInput]
    ): Workout
  }
`;
