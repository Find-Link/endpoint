import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { RedisCache } from 'apollo-server-cache-redis';

import jwtStrategy from './services/auth';
import { port } from './config';
import { typeDefs, resolvers } from './services/apollo';

const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
jwtStrategy(passport);

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (_error, user) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
});

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    host: 'redis',
  }),
  plugins: [responseCachePlugin()],
  context: ({ req }): object => {
    const { user } = req;
    return { user: 'Yui Hatano' };
  },
});
apollo.applyMiddleware({ app });

server.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
