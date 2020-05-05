import bcrypt from 'bcryptjs';
import { validateLogin, validateRegister } from '../../helpers/validation';
import { User } from '../../models/User';
import { createTokens } from '../../middleware/auth';

export const resolvers = {
  Query: {
    register: async (_, { email, username, password, rePassword }, { res }) => {
      const errors = [];

      const userInput = { email, username, password, rePassword };
      const validationErrors = validateRegister(userInput);
      console.log(1);

      if (validationErrors.length > 0) {
        validationErrors.map((err) => errors.push(err));
        console.log(validationErrors);

        return {
          errors,
        };
      }

      try {
        let user = await User.findOne({ email });

        if (user) {
          errors.push({
            type: 'email',
            message: 'Email already exists',
          });
          return errors;
        }

        user = new User({
          email,
          username,
          password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const { accessToken, refreshToken } = createTokens(user);

        res.cookie('access-token', accessToken, { expiresIn: 60 * 15 });
        res.cookie('refresh-token', refreshToken, { expiresIn: 60 * 60 * 24 * 7 });
        console.log(user);

        return user;
      } catch (err) {
        console.error(err);
      }
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
        res.cookie('refresh-token', refreshToken);
        console.log(user);

        return user;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
