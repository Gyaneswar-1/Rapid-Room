// Registration (New User)
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db/db.config.js";
import { SignupSchema } from "@bibek-samal/traveltrove";
import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";

export const userSignup = async (req: Request | any, res: Response | any) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        profileImage:
            req.files && req.files.profileImage
                ? req.files.profileImage[0]
                : undefined,
        isHost: req.body.isHost === "true" ? true : false,
        state: req.body.state,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        country: req.body.country,
    };

    
    // zod input validation
    // const isValid = SignupSchema.safeParse(userData);

    // if (isValid.success === false) {
    //     return res
    //         .status(400)
    //         .json(new ApiError(false, {}, "No", "input's are invalid", 400));
    // }

    const {
        fullName,
        email,
        password,
        isHost,
        state,
        street,
        city,
        zipCode,
        country,
    } = userData;

    // doing the signup
    try {
        const userExists = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (userExists !== null) {
            return res
                .status(500)
                .json(
                    new ApiResponse(
                        false,
                        {},
                        "User exists",
                        "User already exists",
                        500,
                    ),
                );
        }
        //upload image to cloudinary
        const imageUrl = await upLoadOnCloudinary(
            req.files &&
                req.files.profileImage &&
                req.files.profileImage[0] &&
                req.files.profileImage[0].path
                ? req.files.profileImage[0].path
                : null,
        );

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(req.body);
        const result = await prisma.users.create({
            data: {
                email: email,
                fullName: fullName,
                password: hashedPassword,
                profileImage: imageUrl || "",
                isHost: isHost,
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

        const token = await jwt.sign(
            { id: result.id, email: result.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: process.env.EXPIRY_TIME,
            },
        );
        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res
            .status(200)
            .json(new ApiResponse(true, {}, "success", "User signed up", 200));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(false, {}, "Error", "User F**ked up", 500));
    } finally {
        prisma.$disconnect();
    }
};
