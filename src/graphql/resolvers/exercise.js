import { Exercise } from '../../models/Exercise';
import { auth, asd } from '../../middleware/auth';
import { AuthenticationError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    create: async (_, { name, type, difficulty, target }, { req }) => {
      if (!req.userId) {
        return new AuthenticationError('haista vittu');
      }
      // console.log(req.userId);

      return ':D';
    },
  },
};
