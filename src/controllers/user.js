import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/User';

const register = async (email, username, password, rePassword) => {
  let errors = [];

  let token = '';
  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('user exists');

      errors.push({
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

    // await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, tok) => {
      if (err) throw err;
      console.log('token: ' + tok);

      // return token;
      token = tok;
    });
    const response = {
      token,
      errors,
    };

    // console.log(response);

    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  register,
};
