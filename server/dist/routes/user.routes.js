import Router from "express";
import { userSignup } from "../controller/userSignup.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";
import { upload } from "../middleware/multer.js";
import { deleteUser } from "../controller/deleteUser.controller.js";
import { getUserInformation } from "../controller/getUserInformation.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { reserveHotel } from "../controller/reserveHotel.controller.js";
import { userLogout } from "../controller/userLogout.controller.js";
import { createAdmin } from "../controller/createAdmin.controller.js";
import { sendOtp } from "../controller/sendOtp.controller.js";
import { cancleReservation } from "../controller/cancelReservatin.controller.js";
import { getMyBookings } from "../controller/getMyBookings.controller.js";
const userRouter = Router();
userRouter.route("/signup").post(upload.fields([
    //multer middleware setup for file accesss
    {
        name: "profileImage", //file name coming form req object
        maxCount: 1,
    },
]), userSignup);
userRouter.route("/login").post(userLogin);
userRouter.route("/delete").delete(authMiddleware, deleteUser);
userRouter.route("/logout").get(authMiddleware, userLogout);
userRouter.route("/create-admin").post(authMiddleware, createAdmin);
userRouter.route("/getInfo").get(authMiddleware, getUserInformation);
userRouter.route("/edit").put(authMiddleware);
userRouter.route("/bookHotel").post(authMiddleware, reserveHotel);
userRouter.route("/cancel-reservation").delete(authMiddleware, cancleReservation);
userRouter.route("/get-my-bookings").get(authMiddleware, getMyBookings);
userRouter.route("/sendotp").post(sendOtp);
export default userRouter;
