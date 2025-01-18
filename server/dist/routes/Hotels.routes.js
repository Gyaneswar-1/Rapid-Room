import Router from "express";
import { addNewHotel } from "../controller/addNewHotel.controller.js";
import { deleteHotel } from "../controller/deleteHotel.controller.js";
import { upload } from "../middleware/multer.js";
const router = Router();
router.post("/add", upload.fields([
    //multer middleware setup for file accesss
    {
        name: "profileImage", //file name coming form req object
        maxCount: 1,
    },
]), addNewHotel);
router.delete("/delete", deleteHotel);
export default router;
