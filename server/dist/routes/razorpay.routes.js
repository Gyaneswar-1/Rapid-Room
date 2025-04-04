import { getRazorpayKey } from "../controller/getRazorpayKey.controller.js";
import { Router } from "express";
const razorpayRoute = Router();
razorpayRoute.route("/getkey").get(getRazorpayKey);
export default razorpayRoute;
