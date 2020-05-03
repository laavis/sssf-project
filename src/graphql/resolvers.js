import { User } from '../models/User';
import { register, login } from '../controllers/user';

export const resolvers = {
  Query: {
    hello: () => 'hi',
  },
  Mutation: {
    registerUser: async (_, { email, username, password, rePassword }) => {
      const response = await register(email, username, password, rePassword);
      return response;
    },
    loginUser: async (_, { email, password }) => {
      console.log(email, password);

      const response = await login(email, password);
      return response;
    },
  },
};
