import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db/db.config.js";
export const userSignup = async (req, res) => {
    const { fullName, email, password, profileImage, state, street, city, zipCode, country, } = req.body;
    try {
        const userExists = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists !== null) {
            return res
                .status(500)
                .json(new ApiResponse({}, "User exists", "User already exists", 500));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body);
        const result = await prisma.users.create({
            data: {
                email: email,
                fullName: fullName,
                password: hashedPassword,
                profileImage: profileImage,
                address: {
                    create: {
                        state: state,
                        street: street,
                        city: city,
                        zipCode: zipCode,
                        country: country,
                    },
                },
            },
        });
        const token = await jwt.sign(result, process.env.JWT_SECRET, {
            expiresIn: process.env.EXPIRY_TIME,
        });
        res.cookie("token", token, { httpOnly: true, secure: true });
        return res
            .status(200)
            .json(new ApiResponse({ result, token }, "success", "User signed up", 200));
    }
    catch (error) {
        return res
            .status(500)
            .json(new ApiError({}, "Error", "User F**ked up", 500));
    }
};
