import { gql, makeExecutableSchema } from 'apollo-server-express';
import { typeDefs as User } from './typeDefs/user';

makeExecutableSchema({
  typeDefs: [User],
  resolvers: {},
});

/*export const typeDefs = gql`
  type Query {
    hello: String!
  }
  type UserRegister {
    token: String
    errors: [Error]
  }
  type Error {
    type: String
    message: String
  }
  type Exercise {
    name: String
    type: String
    difficulty: String
    target: String
  }
  type ExerciseResponse {
    exercise: Exercise
    errors: [Error]
  }
  type Mutation {
    registerUser(
      email: String!
      username: String!
      password: String!
      rePassword: String!
    ): UserRegister
    loginUser(email: String!, password: String!): UserLogin
    createExercise(
      name: String!
      type: String
      difficulty: String
      target: String!
    ): ExerciseResponse
  }
  type UserLogin {
    accessToken: String
    refreshToken: String
    errors: [Error]
  }
`;*/
