import { payment } from "../controller/payment.controller.js";
import { paymentVerification } from "../controller/paymentVerification.controller.js";
import { Router } from "express";
const paymentRoute = Router();
paymentRoute.route("/payment").post(payment);
paymentRoute.route("/payment-verification").post(paymentVerification);
export default paymentRoute;
