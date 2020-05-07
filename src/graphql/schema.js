import { gql, makeExecutableSchema, AuthenticationError } from 'apollo-server-express';
import { merge } from 'lodash';
import { typeDefs as User } from './typeDefs/userTypeDefs';
import { typeDefs as Exercise } from './typeDefs/exerciseTypeDefs';
import { typeDefs as Workout } from './typeDefs/workoutTypeDefs';
import { resolvers as userResolver } from './resolvers/user';
import { resolvers as exerciseResolver } from './resolvers/exercise';
import { resolvers as workoutResolver } from './resolvers/workout';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const RootResolver = {
  Mutation: {
    protectedAction: (root, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
    },
  },
};

// const resolvers = {};

//console.log(userResolvers);
//console.log(exerciseResolvers);
// console.log(merge(userResolvers, exerciseResolvers));

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, User, Exercise, Workout],
  resolvers: merge(userResolver, exerciseResolver, workoutResolver),
});
