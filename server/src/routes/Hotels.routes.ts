import Router from "express";
import { addNewHotel } from "../controller/addNewHotel.controller.js";

const router = Router();

router.post("/add",addNewHotel);

export default router;
