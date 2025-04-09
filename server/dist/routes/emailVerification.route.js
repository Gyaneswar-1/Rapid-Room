import { Router } from "express";
import { sendMail } from "../controller/sendOtp.controller.js";
import { verifyEmail } from "../controller/verifyEmail.controller.js";
export const emailRouter = Router();
emailRouter.route("/send-otp").post(sendMail);
emailRouter.route("/verify-email").post(verifyEmail);
