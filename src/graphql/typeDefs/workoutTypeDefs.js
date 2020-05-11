import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Workout {
    id: ID
    name: String!
    difficulty: String
    category: String
    target: String!
    createdBy: ID
    exercises: [WorkoutExercise]!
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
      exercises: [WorkoutExerciseInput]
    ): Workout
    updateWorkout(
      id: ID!
      name: String!
      difficulty: String
      category: String
      target: String!
      createdBy: ID
      exercises: [WorkoutExerciseInput]
    ): Workout
    deleteWorkout(id: ID!): String
  }
`;
