import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { RedisCache } from 'apollo-server-cache-redis';
import bluebird from 'bluebird';
import mongoose from 'mongoose';

import jwtStrategy from './services/auth';
import { port, mongoURL } from './config';
import { typeDefs, resolvers } from './services/apollo';

// Express
const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
jwtStrategy(passport);

// Express

// GraphQL
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
    return { user };
  },
});
apollo.applyMiddleware({ app });
// GraphQL

// MongoDB

mongoose.Promise = bluebird;
mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

// MongoDB

server.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
