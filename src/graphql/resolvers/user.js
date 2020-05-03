import bcrypt from 'bcryptjs';
import { validateLogin } from '../../helpers/validation';
import { User } from '../../models/User';
import { createTokens } from '../../middleware/auth';

export const resolvers = {
  Mutation: {
    register: async (_, { email, username, password, rePassword }) => {
      const response = await register(email, username, password, rePassword);
      return response;
    },
    login: async (_, { email, password }, { res }) => {
      const errors = [];
      const userInput = { email, password };
      const validationErrors = validateLogin(userInput);

      if (validationErrors.length > 0) {
        validationErrors.map((err) => errors.push(err));
        return {
          errors,
        };
      }

      try {
        const user = await User.findOne({ email });
        if (!user) {
          errors.push({ message: 'Invalid credentials' });
          return {
            errors,
          };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          errors.push({ message: 'Invalid credentials' });
          return {
            errors,
          };
        }

        const { accessToken, refreshToken } = createTokens(user);

        res.cookie('access-token', accessToken, { expiresIn: 60 * 15 });
        res.cookie('refresh-token', refreshToken, { expiresIn: 60 * 60 * 24 * 7 });
        console.log(user);

        return user;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
