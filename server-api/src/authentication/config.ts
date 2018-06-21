import { IStrategyOptionsWithRequest } from 'passport-local';


export const AUTH_CONFIGS = {
  sessionOptions: {
    secret: "outsourceservicesecret",
    resave: true,
    saveUninitialized: true
  },
  strategyOptions: <IStrategyOptionsWithRequest>{
    passReqToCallback: true
  }
}