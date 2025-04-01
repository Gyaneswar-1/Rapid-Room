import { Router } from "express";
import {createReview} from "../controller/addNewReview.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { deleteReview } from "../controller/deleteReview.controller.js";
import { getReview } from "../controller/getReview.controller.js";
import { editReview } from "../controller/editReview.controller.js";
import {getOverallRatings} from "../controller/getOveralRating.controller.js"

const reviewRouter = Router();

reviewRouter.route("/add").post(authMiddleware, createReview);
reviewRouter.route("/get").get(authMiddleware, getReview);
reviewRouter.route("/delete").delete(authMiddleware, deleteReview);
reviewRouter.route("/edit").put(authMiddleware, editReview);
reviewRouter.route("/get-rating").post(authMiddleware,getOverallRatings);

export default reviewRouter;
