import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type WorkoutExercise {
    exercise: Exercise
    repCount: Int
    weight: Int
    name: String
  }
  input WorkoutExerciseInput {
    exerciseId: ID!
    repCount: Int
    weight: Int
    name: String
  }
`;
