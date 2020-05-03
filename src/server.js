import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from 'config';
import { connectDB } from './utils/connectDB';
import { schema } from './graphql/schema';

const startServer = async () => {
  try {
    const app = express();
    const port = config.get('port');

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
    });

    server.applyMiddleware({ app });

    connectDB();

    app.listen(port, () =>
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
