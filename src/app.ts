import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import helmet from 'helmet';

import jwtStrategy from './services/auth';
import { port } from './config';

const app = express();
const server = new http.Server(app);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
jwtStrategy(passport);

server.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
