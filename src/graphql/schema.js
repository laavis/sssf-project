import { gql, makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { typeDefs as User } from './typeDefs/user';
import { resolvers as userResolvers } from './resolvers/user';

const Query = gql`
  type Query {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [Query, User],
  resolvers: merge(userResolvers),
});
