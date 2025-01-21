import Router from "express";
import { userSignup } from "../controller/userSignup.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";
import { upload } from "../middleware/multer.js";
import { deleteUser } from "../controller/deleteUser.controller.js";
import { getUserInformation } from "../controller/getUserInformation.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { reserveHotel } from "../controller/reserveHotel.controller.js";
const userRouter = Router();

userRouter.route("/signup").post(
    upload.fields([
        //multer middleware setup for file accesss
        {
            name: "profileImage", //file name coming form req object
            maxCount: 1,
        },
    ]),
    userSignup,
);

userRouter.route("/login").post(userLogin);
userRouter.route("/delete").delete(authMiddleware,deleteUser);

userRouter.route("/getInfo").get(authMiddleware,getUserInformation);
userRouter.route("/bookHotel").post(authMiddleware,reserveHotel);

export default userRouter;
