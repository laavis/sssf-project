import config from 'config';
import { sign, verify } from 'jsonwebtoken';
const accessSecret = config.get('accessSecret');
const refreshSecret = config.get('refreshSecret');
const jwtSecret = config.get('jwtSecret');

export const auth = req => {
  const token = req.cookies['refresh-token'];
  if (!token) return 'Authorization denied';

  try {
    const decoded = verify(token, jwtSecret);

    req.user = decoded.user;
    return 'ok';
  } catch (err) {
    console.error(err);
    return 'Something went wrong :(';
  }
};

export const createTokens = user => {
  const refreshToken = sign({ userId: user._id, count: user.count }, refreshSecret, {
    expiresIn: '7d',
  });
  const accessToken = sign({ userId: user._id }, accessSecret, {
    expiresIn: '15min',
  });

  return { refreshToken, accessToken };
};
