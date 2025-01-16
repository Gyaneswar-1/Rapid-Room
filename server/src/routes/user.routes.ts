import Router from "express";
import { userSignup } from "../controller/userSignup.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";

const router = Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
