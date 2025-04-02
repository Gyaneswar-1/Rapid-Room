import { payment } from "../controller/payment.controller.js";
import { paymentVerification } from "../controller/paymentVerification.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const paymentRoute = Router();

paymentRoute.route("/payment").post(authMiddleware,payment);
paymentRoute.route("/payment-verification").post(paymentVerification)

export default paymentRoute;