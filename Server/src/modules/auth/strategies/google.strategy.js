import passport from "passport";
import env from "../../../config/env.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const handleGoogleAuth = (app) => {
  app.use(passport.initialize());

  // Configure Passport to use Google OAuth 2.0 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => done(null, profile),
    ),
  );
};

export default handleGoogleAuth;
