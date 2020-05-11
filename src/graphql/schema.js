import { gql, makeExecutableSchema, AuthenticationError } from 'apollo-server-express';
import { merge } from 'lodash';

import { typeDefs as User } from './typeDefs/userTypeDefs';
import { typeDefs as Exercise } from './typeDefs/exerciseTypeDefs';
import { typeDefs as Workout } from './typeDefs/workoutTypeDefs';
import { typeDefs as WorkoutEx } from './typeDefs/weTypeDefs';
import { resolvers as userResolver } from './resolvers/user';
import { resolvers as exerciseResolver } from './resolvers/exercise';
import { resolvers as workoutResolver } from './resolvers/workout';

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [root, User, Exercise, WorkoutEx, Workout],
  resolvers: merge(userResolver, exerciseResolver, workoutResolver),
});
