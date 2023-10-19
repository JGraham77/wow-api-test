import passport from "passport";
import BnetStrategy from "passport-bnet";
import { Application } from "express";
import config from "../config";

export function configurePassport(app: Application) {
    passport.use(
        new BnetStrategy(
            {
                clientID: config.wowapi.clientid,
                clientSecret: config.wowapi.clientsecret,
                callbackURL: "http://localhost:3000/auth/bnet/callback",
                // callbackURL: " https://dev.battle.net/",
                scope: config.wowapi.scopes,
                state: "pizza",
                region: "us",
            },
            function (accessToken: string, refreshToken: string, profile: unknown, done: any) {
                console.log(accessToken, refreshToken, profile);
                return done(null, profile);
            }
        )
    );
    app.use(passport.initialize());
}

export function generateWowAccessToken() {}
