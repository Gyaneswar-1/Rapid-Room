import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExists = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
                id: true,
            }
        });
        if (isExists === null) {
            return res
                .status(404)
                .json(new ApiError({}, "User doesNot exists", "Error 404 user not found !", 404));
        }
        const isCorrectPassword = await bcrypt.compare(password, isExists.password);
        if (isCorrectPassword === false) {
            return res
                .status(500)
                .json(new ApiError({}, "Auth error", "Email or password didnot matched", 500));
        }
        const token = await jwt.sign({ id: isExists.id, email: isExists.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRY_TIME,
        });
        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
        });
        return res
            .status(200)
            .json(new ApiResponse({}, "Logged in", "user logged in successfully", 200));
    }
    catch (error) {
        return res
            .status(404)
            .json(new ApiError({}, "User doesNot exists", "Error", 404));
    }
};
