import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
// import * as Promise from 'bluebird';
import { Kernel } from 'inversify';
import { Strategy } from 'passport-local';
import { AUTH_CONFIGS } from './config';
import { getVerificationHandler } from './verification-handler';

// import * as TYPES from '../types';

export function init(app: express.Application, kernel: Kernel) {
  // interface IAuthUser {
  //   userId: number;
  //   random: number;
  // }

  passport.serializeUser<string, string>((login, done): void => {
    // let authUser: IAuthUser = {
    //   random: Math.random(),
    //   userId: userContext.userId
    // };
    done(null, login);
    // let redis = kernel.get<ICache>(TYPES.CACHE);
    // return redis.setObject(authUser.userId.toString(), userContext)
    //   .then(() => {
    //     return done(null, authUser);
    //   });
  });

  passport.deserializeUser<string, string>((sessionUser, done): void => {
    //Autho
    done(null, sessionUser);
  });

  // passport.deserializeUser<IUserContext, IAuthUser>((sessionUser, done): Promise<void> => {
  //   //Autho
  //   let redis = kernel.get<ICache>(TYPES.CACHE);
  //   return redis.getObject<IUserContext>(sessionUser.userId.toString())
  //     .then((userContext) => done(null, userContext));
  // });

  let localStrategy = new Strategy(AUTH_CONFIGS.strategyOptions, getVerificationHandler());
  passport.use(localStrategy);

  // TODO: remove <any> cast when TC compilation issue is resolved
  app.use(<any>session(AUTH_CONFIGS.sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
}
