import 'reflect-metadata';
import { createConnection } from 'typeorm'
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

const main = async () => {
  await createConnection();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => { return }
  })

  apolloServer.applyMiddleware({ app })

  app.listen(4000, () => {
    console.log('server started on port 4000')
  })
};

main().catch(err => {
  console.error(err);
});