import { gql, makeExecutableSchema, AuthenticationError } from 'apollo-server-express';
import { merge } from 'lodash';
import { typeDefs as User } from './typeDefs/user';
import { typeDefs as Exercise } from './typeDefs/exercise';
import { resolvers as userResolver } from './resolvers/user';
import { resolvers as exerciseResolver } from './resolvers/exercise';

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
  typeDefs: [Query, User, Exercise],
  resolvers: merge(userResolver, exerciseResolver),
});
