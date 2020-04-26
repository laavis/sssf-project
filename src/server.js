import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from 'config';
import { connectDB } from './utils/connectDB';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs.js';

const startServer = async () => {
  const app = express();
  const port = config.get('port');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  await connectDB();

  app.listen(port, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
};

startServer();
