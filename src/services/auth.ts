import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';

import User from '../models/User';
import { secret } from '../config';

export default (passport: PassportStatic): void => {
  passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret,
  }, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    });
  }));
};
