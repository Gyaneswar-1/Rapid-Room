import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (googleClientId && googleClientSecret) {
    passport.use("google", new GoogleStrategy({
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/api/v1/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await prisma.users.findUnique({
                where: { email: profile.emails[0].value },
            });
            if (user) {
                user = await prisma.users.update({
                    where: {
                        email: profile.emails[0].value
                    },
                    data: {
                        isEmailVerified: true
                    }
                });
            }
            if (!user) {
                user = await prisma.users.create({
                    data: {
                        email: profile.emails[0].value,
                        password: "google",
                        fullName: profile.displayName,
                        isEmailVerified: true,
                        profileImage: profile.photos?.[0]?.value || null,
                    },
                });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            done(null, token);
        }
        catch (error) {
            return done(error);
        }
    }));
}
else {
    console.warn("⚠️ Google OAuth credentials not found in environment variables. Google OAuth is disabled.");
}
// Facebook Strategy
const facebookAppId = process.env.FB_APP_ID;
const facebookAppSecret = process.env.FB_APP_SECRET;
if (facebookAppId && facebookAppSecret) {
    passport.use("facebook", new FacebookStrategy({
        clientID: facebookAppId,
        clientSecret: facebookAppSecret,
        callbackURL: process.env.FB_CALLBACK_URL || "http://localhost:3000/api/v1/facebook/callback",
        profileFields: ["id", "displayName", "photos", "emails"],
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await prisma.users.findUnique({
                where: { email: profile.emails[0].value },
            });
            if (user) {
                user = await prisma.users.update({
                    where: {
                        email: profile.emails[0].value
                    },
                    data: {
                        isEmailVerified: true
                    }
                });
            }
            if (!user) {
                user = await prisma.users.create({
                    data: {
                        fullName: profile.displayName,
                        email: profile.emails?.[0]?.value || null,
                        profileImage: profile.photos?.[0]?.value || null,
                        isEmailVerified: true,
                        password: "facebook",
                    },
                });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            done(null, token);
        }
        catch (error) {
            return done(error);
        }
    }));
}
else {
    console.warn("⚠️ Facebook OAuth credentials not found in environment variables. Facebook OAuth is disabled.");
}
export default passport;
