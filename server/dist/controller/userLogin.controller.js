import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SigninSchema } from "@bibek-samal/traveltrove";
export const userLogin = async (req, res) => {
    //zod input validation
    const isValid = SigninSchema.safeParse(req.body);
    if (isValid.success === false) {
        return res
            .status(400)
            .json(new ApiError(false, {}, "false", isValid.error?.message || "input are invalid", 400));
    }
    const { email, password } = req.body;
    try {
        const isExists = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
                isEmailVerified: true,
                id: true,
            },
        });
        if (isExists === null) {
            return res
                .status(404)
                .json(new ApiError(false, {}, "User doesNot exists", "Error 404 user not found !", 404));
        }
        const isCorrectPassword = await bcrypt.compare(password, isExists.password);
        if (isCorrectPassword === false) {
            return res
                .status(500)
                .json(new ApiError(false, {}, "Auth error", "Email or password didnot matched", 500));
        }
        const token = await jwt.sign(//no expair of token
        { id: isExists.id, email: isExists.email }, process.env.JWT_SECRET);
        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 100 * 365 * 24 * 60 * 60 * 1000
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { isEmailVerifyed: isExists.isEmailVerified,
            email: isExists.email
        }, "Logged in", "user logged in successfully", 200));
    }
    catch (error) {
        return res
            .status(404)
            .json(new ApiError(false, {}, "User doesNot exists", "Error", 404));
    }
    finally {
        prisma.$disconnect();
    }
};
