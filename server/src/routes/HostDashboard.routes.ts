import { Router } from "express";
import { getHostStats } from "../controller/getHostStats.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";
import { getHostHotels } from "../controller/getHostHotels.controller.js";

const hostdashboard = Router()

hostdashboard.route("/stats").get( authMiddleware,isAdminMiddleware, getHostStats)
hostdashboard.route("/hotels").get( authMiddleware,isAdminMiddleware, getHostHotels)


export default hostdashboard;