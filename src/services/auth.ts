import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import { Request } from 'express';
import { AuthenticationError } from 'apollo-server';
import { UserSchema } from '../models/User.type';
import User from '../models/User';

import { secret } from '../config';

function authenticate(_target: Function, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function (...args: any): any {
      const [_parent, _arguments, context] = args;
      const { user } = context;

      if (user) {
        const result = original.apply(this, args);
        return result;
      }

      // TODO: remove authentication for now, will enable in the future
      // throw new AuthenticationError('You must be logged in');
    };
  }
  return descriptor;
}

export default (passport: PassportStatic): void => {
  passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
    passReqToCallback: true,
  }, (req: Request, payload: UserSchema, done: (err: Error | null, user: any) => void) => {
    User.findById(payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        req.user = user;
        return done(null, user);
      }

      return done(null, false);
    });
  }));
};

export { authenticate };
