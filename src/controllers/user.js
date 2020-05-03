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

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await signToken(payload);

    return { token };
  } catch (err) {
    console.error(err);
  }
};

const login = async (email, password) => {
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
    const payload = {
      user: {
        id: user._id,
      },
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    return { accessToken, refreshToken };
  } catch (err) {
    console.error(err);
  }
};

const signAccessToken = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '15min' }, (err, tok) => {
      if (err) rej(err);
      res(tok);
    });
  });
};

const signRefreshToken = (payload) => {
  return new Promise((res, rej) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '7d' }, (err, tok) => {
      if (err) rej(err);
      res(tok);
    });
  });
};

module.exports = {
  register,
  login,
};
