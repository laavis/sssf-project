import { User } from '../models/User';
import { validator, formatYupError } from '../helpers/validation';
import { register } from '../controllers/user';

export const resolvers = {
  Query: {
    hello: () => 'hi',
  },
  Mutation: {
    registerUser: async (_, { email, username, password, rePassword }) => {
      /*try {
        const args = { email, username, password, rePassword };
        await validator.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }*/
      const response = await register(email, username, password, rePassword);
      console.log(response);

      return response;
    },
  },
};
