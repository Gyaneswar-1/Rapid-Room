import Router from "express";
import { addNewHotel } from "../controller/addNewHotel.controller.js";
import { deleteHotel } from "../controller/deleteHotel.controller.js";
import { upload } from "../middleware/multer.js";
import { getAllHotels } from "../controller/getAllHotels.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const hotelCRUD = Router();

hotelCRUD.route("/add").post(
    // upload.fields([
    //     //multer middleware setup for file accesss
    //     {
    //         name: "profileImage", //file name coming form req object
    //         maxCount: 1,
    //     },
    // ]),
    authMiddleware,
    addNewHotel,
);
hotelCRUD.route("/delete").delete(deleteHotel);
hotelCRUD.route("/get").get(getAllHotels);

export default hotelCRUD;
