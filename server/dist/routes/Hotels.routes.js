import Router from "express";
import { addNewHotel } from "../controller/addNewHotel.controller.js";
import { deleteHotel } from "../controller/deleteHotel.controller.js";
import { getAllHotels } from "../controller/getAllHotels.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdminMiddleware } from "../middleware/isAdmin.middleware.js";
const hotelCRUD = Router();
hotelCRUD.route("/add").post(
// upload.fields([
//     //multer middleware setup for file accesss
//     {
//         name: "profileImage", //file name coming form req object
//         maxCount: 1,
//     },
// ]),
authMiddleware, isAdminMiddleware, addNewHotel);
hotelCRUD.route("/delete").delete(authMiddleware, isAdminMiddleware, deleteHotel);
hotelCRUD.route("/get").get(authMiddleware, getAllHotels);
export default hotelCRUD;
