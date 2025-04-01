import express from "express";
import passport from "passport";
import { googleAuthCallback, facebookAuthCallback } from "../controller/socialAuth.controller.js";
const router = express.Router();
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleAuthCallback);
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), facebookAuthCallback);
export default router;
