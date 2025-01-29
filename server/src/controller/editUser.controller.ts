import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";
import { Request, Response } from "express";

export const editUser = async (req: Request | any, res: Response | any) => {
    try {
        console.log("Incoming request body:", req);
        const userData = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            profileImage:
                req.files && req.files.profileImage
                    ? req.files.profileImage[0]
                    : undefined,
            isOwner: req.body.isOwner === "true" ? true : false,
            state: req.body.state,
            street: req.body.street,
            city: req.body.city,
            zipCode: req.body.zipCode,
            country: req.body.country,
        };

        console.log("here is the user data", userData);
        console.log(userData.fullName);
        console.log(userData.email);

        const imageUrl = await upLoadOnCloudinary(
            req.files &&
                req.files.profileImage &&
                req.files.profileImage[0] &&
                req.files.profileImage[0].path
                ? req.files.profileImage[0].path
                : null,
        );

        const { fullName, email, street, city, state, zipCode, country } =
            userData;
        console.log("desctrvkajshdgf");
        console.log(fullName);
        console.log(email);

        const isExists = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                fullName: true,
                email: true,
                profileImage: true,
                address: {
                    select: {
                        street: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        country: true,
                    },
                },
            },
        });

        console.log(fullName);
        const result = await prisma.users.update({
            where: { id: req.user.id },
            data: {
                fullName: fullName || isExists?.fullName,
                email: email || isExists?.email,
                profileImage: imageUrl || isExists?.profileImage,
                address: {
                    update: {
                        street: street || isExists?.address?.street,
                        city: city || isExists?.address?.city,
                        state: state || isExists?.address?.state,
                        zipCode: zipCode || isExists?.address?.zipCode,
                        country: country || isExists?.address?.country,
                    },
                },
            },
        });
        res.status(200).json(
            new ApiResponse(true, result, "User updated successfully"),
        );
    } catch (error) {
        res.status(500).json(
            new ApiError(false, { error }, "Failed to update user"),
        );
    }
};
