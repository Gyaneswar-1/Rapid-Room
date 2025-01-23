import { Router } from "express";
import { addNewReview } from "../controller/addNewReview.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { deleteReview } from "../controller/deleteReview.controller.js";
import { getReview } from "../controller/getReview.controller.js";

const reviewRouter = Router();

reviewRouter.route("/add").post(authMiddleware, addNewReview);
reviewRouter.route("/get").get(authMiddleware, getReview );
reviewRouter.route("/delete").delete(authMiddleware,  deleteReview );

export default reviewRouter;
