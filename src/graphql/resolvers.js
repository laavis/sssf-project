import { User } from '../models/User';
import { validator, formatYupError } from '../helpers/validation';

export const resolvers = {
  Query: {
    hello: () => 'hi',
  },
  Mutation: {
    registerUser: async (_, { email, username, password, rePassword }) => {
      try {
        const args = { email, username, password, rePassword };
        await validator.validate(args, { abortEarly: false });
      } catch (err) {
        console.log(formatYupError(err));
        return formatYupError(err);
      }

      const user = new User({ email, username, password });

      return user;
    },
  },
};
