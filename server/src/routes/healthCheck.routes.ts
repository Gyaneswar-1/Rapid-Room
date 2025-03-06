import { Router } from "express";
import { healthCheck } from "../controller/healthCheck.controller.js";

const healthCheckRoute  = Router();

healthCheckRoute.route("/").get(healthCheck)

export default healthCheckRoute;