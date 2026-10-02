import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db/db.config.js";
import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";
export const userSignup = async (req, res) => {
    const userData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        profileImage: req.files && req.files.profileImage
            ? req.files.profileImage[0]
            : undefined,
        isHost: req.body.isHost === "true" || req.body.isHost === true,
        state: req.body.state,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        country: req.body.country,
    };
    const { fullName, email, password, isHost, state, street, city, zipCode, country, } = userData;
    // doing the signup
    try {
        const userExists = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists !== null) {
            // If already verified, inform user
            if (userExists.isEmailVerified) {
                return res
                    .status(400)
                    .json(new ApiResponse(false, {}, "User exists", "User already exists with this email. Please sign in.", 400));
            }
            // If user exists but is not verified yet, allow updating details to proceed with OTP verification
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await prisma.users.update({
                where: { email: email },
                data: {
                    fullName: fullName || userExists.fullName,
                    password: hashedPassword,
                    isHost: isHost,
                },
            });
            const token = jwt.sign({ id: updatedUser.id, email: updatedUser.email }, process.env.JWT_SECRET);
            res.cookie("token", `Bearer ${token}`, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            });
            return res
                .status(200)
                .json(new ApiResponse(true, { email: updatedUser.email }, "success", "User registration pending OTP verification", 200));
        }
        //upload image to cloudinary
        const imageUrl = await upLoadOnCloudinary(req.files &&
            req.files.profileImage &&
            req.files.profileImage[0] &&
            req.files.profileImage[0].path
            ? req.files.profileImage[0].path
            : null);
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await prisma.users.create({
            data: {
                email: email,
                fullName: fullName,
                password: hashedPassword,
                profileImage: imageUrl || "",
                isHost: isHost,
                address: {
                    create: {
                        state: state || null,
                        street: street || null,
                        city: city || null,
                        zipCode: zipCode || null,
                        country: country || null,
                    },
                },
            },
        });
        const token = jwt.sign({ id: result.id, email: result.email }, process.env.JWT_SECRET);
        res.cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { email: result.email }, "success", "User signed up successfully", 200));
    }
    catch (error) {
        console.error("userSignup error:", error);
        return res
            .status(500)
            .json(new ApiError(false, {}, "Error", error?.message || "User registration failed", 500));
    }
};
