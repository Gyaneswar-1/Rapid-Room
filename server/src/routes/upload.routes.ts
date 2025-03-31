import { Router } from "express";
import { uploadImage } from "../controller/uploadImage.controller.js";
import { deleteImage } from "../controller/deleteImage.controller.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);
router.delete("/delete", deleteImage);

export default router;
