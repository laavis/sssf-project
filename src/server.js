import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import cookiesMiddleware from 'universal-cookie-express';
import config from 'config';
import { verify } from 'jsonwebtoken';
import { User } from './models/User';
import { connectDB } from './utils/connectDB';
import { schema } from './graphql/schema';
import { createTokens } from './middleware/auth';
import cors from 'cors';

const port = config.get('port');
const accessSecret = config.get('accessSecret');
const refreshSecret = config.get('refreshSecret');

const startServer = async () => {
  const server = new ApolloServer({
    cors: false,
    schema,
    context: ({ req, res, next }) => ({ req, res, next }),
  });

  connectDB();

  const app = express();

  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

  app.use(cookieParser());
  app.use(cookiesMiddleware());

  app.use(async (req, res, next) => {
    const refreshToken = req.cookies['refresh-token'];
    const accessToken = req.cookies['access-token'];

    if (!refreshToken && !accessToken) {
      console.log('no tokens');

      return next();
    }

    try {
      const data = verify(accessToken, accessSecret);
      req.userId = data.userId;
      return next();
    } catch (err) {
      console.error(err);
    }

    if (!refreshToken) {
      return next();
    }

    let data;

    try {
      data = verify(refreshToken, refreshSecret);
    } catch (err) {
      console.error(err);
      return next();
    }

    const user = await User.findOne({ _id: data.userId });
    // token has been invalidated
    if (!user || user.count !== data.count) {
      console.log('no user');

      return next();
    }

    const tokens = createTokens(user);

    res.cookie('refresh-token', tokens.refreshToken);
    res.cookie('access-token', tokens.accessToken);
    req.userId = user.id;

    next();
  });

  server.applyMiddleware({ app, cors: false });
  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
};

startServer();
