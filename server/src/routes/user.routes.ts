import Router from "express";
import { userSignup } from "../controller/userSignup.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";
import { upload } from "../middleware/multer.js";

const userRouter = Router();

userRouter.route("/signup").post(
    upload.fields([ //multer middleware setup for file accesss
        {
            name: "profileImage", //file name coming form req object
            maxCount: 1
        }
    ]),
    userSignup);


userRouter.route("/login").post(userLogin);

export default userRouter;
