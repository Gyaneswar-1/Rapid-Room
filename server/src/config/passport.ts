import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";

passport.use(
    "google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/api/v1/google/callback",
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: (error: any, user?: any) => void,
        ) => {
            try {
                let user = await prisma.users.findUnique({
                    where: { email: profile.emails[0].value },
                });

                if (!user) {
                    user = await prisma.users.create({
                        data: {
                            email: profile.emails[0].value,
                            password: "google",
                            fullName: profile.displayName,
                            profileImage: profile.photos?.[0]?.value || null,
                        },
                    });
                }

                const token = jwt.sign(
                    { id: user.id,email: user.email },
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "1d",
                    },
                );

                done(null, token);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

// Facebook Strategy
passport.use(
    "facebook",
    new FacebookStrategy(
        {
            clientID: process.env.FB_APP_ID!,
            clientSecret: process.env.FB_APP_SECRET!,
            callbackURL: "http://localhost:3000/api/v1/facebook/callback",
            profileFields: ["id", "displayName", "photos", "emails"],
        },
        async (
            accessToken: string,
            refreshToken: any,
            profile: any,
            done: (error: any, user?: any) => void,
        ) => {
            try {
                let user = await prisma.users.findUnique({
                    where: { email: profile.emails[0].value },
                });

                if (!user) {
                    user = await prisma.users.create({
                        data: {
                            fullName: profile.displayName,
                            email: profile.emails?.[0]?.value || null,
                            profileImage: profile.photos?.[0]?.value || null,
                            password: "facebook",
                        },
                    });
                }

                const token = jwt.sign(
                    { id: user.id, email:user.email},
                    process.env.JWT_SECRET!,
                    {
                        expiresIn: "1d",
                    },
                );

                done(null, token);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

export default passport;
