import Router from "express";
import { addNewHotel } from "../controller/addNewHotel.controller.js";

const hotelRouter = Router();

hotelRouter.route("/add").post(addNewHotel);

export default hotelRouter;
