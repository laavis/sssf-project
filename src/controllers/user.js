import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/User';
import { validateRegister, validateLogin } from '../helpers/validation';

const jwtSecret = config.get('jwtSecret');

const register = async (email, username, password, rePassword) => {
  const errors = [];

  const userInput = { email, username, password, rePassword };
  const validationErrors = validateRegister(userInput);

  if (validationErrors.length > 0) {
    validationErrors.map((err) => errors.push(err));
    return {
      token: null,
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
    }

    user = new User({
      email,
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await signToken(payload);

    return { token, errors };
  } catch (err) {
    console.error(err);
  }
};

const login = async (email, password) => {
  console.log(email, password);

  const errors = [];
  const userInput = { email, password };

  const validationErrors = validateLogin(userInput);

  if (validationErrors.length > 0) {
    validationErrors.map((err) => errors.push(err));
    return {
      token: null,
      errors,
    };
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.push({
        type: 'login',
        message: 'Invalid credentials',
      });
      return {
        token: null,
        errors,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.push({
        type: 'login',
        message: 'Invalid credentials',
      });
      return {
        token: null,
        errors,
      };
    }
    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await signToken(payload);

    return { token, errors };
  } catch (err) {
    console.error(err);
  }
};

const signToken = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '3 days' }, (err, tok) => {
      if (err) rej(err);
      res(tok);
    });
  });
};

module.exports = {
  register,
  login,
};
