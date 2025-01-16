import { Router } from "express";
import { healthCheck } from "../controller/healthCheck.controller.js";

const route = Router();

route.get("/healthCheck",healthCheck);

export default route;