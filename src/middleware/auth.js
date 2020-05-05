import config from 'config';
import { sign, verify } from 'jsonwebtoken';
const accessSecret = config.get('accessSecret');
const refreshSecret = config.get('refreshSecret');
const jwtSecret = config.get('jwtSecret');

import { User } from '../models/User';

export const auth = (req) => {
  console.log('aa');

  const token = req.cookies['refresh-token'];
  // const token = req.header('refresh-token');

  console.log('toiken: ' + token);

  if (!token) return 'Authorization denied';

  try {
    console.log(req.user);
    const decoded = verify(token, jwtSecret);

    req.user = decoded.user;
    console.log('authenticated');
    return 'ok';
  } catch (err) {
    console.error(err);
    return 'Something went wrong :(';
  }
};

export const createTokens = (user) => {
  const refreshToken = sign({ userId: user._id, count: user.count }, refreshSecret, {
    expiresIn: '7d',
  });
  const accessToken = sign({ userId: user._id }, accessSecret, {
    expiresIn: '15min',
  });

  return { refreshToken, accessToken };
};
