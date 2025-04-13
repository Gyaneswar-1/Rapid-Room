import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";

export const getUserInformation = async (
    req: Request | any,
    res: Response | any,
) => {
    try {
        const userInformation = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                profileImage: true,
                upiID:true,
                GovID: true,
                isHost: true,
                createdAt: true,
                hostExperience: true,
                hostRating: true,
                hostResponseRate: true,
                address: {
                    select: {
                        street: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        country: true,
                        latitude: true,
                        longitude: true,
                    },
                },
                status:true
            },
        });
        if (!userInformation) {
            return res
                .status(404)
                .json(
                    new ApiError(
                        false,
                        {},
                        "Failed",
                        "Can't get the data",
                        404,
                    ),
                );
        }

        // Convert BigInt to Number safely
        const formattedUserInfo = {
            ...userInformation,
            phoneNumber: userInformation.phoneNumber ? Number(userInformation.phoneNumber) : null,
            GovID: userInformation.GovID ? Number(userInformation.GovID) : null,
        };

        return res
            .status(200)
            .json(
                new ApiResponse(
                    true,
                    formattedUserInfo,
                    "Success",
                    "Successfully get the user Information",
                    200,
                ),
            );
    } catch (error: any) {
        return res.status(404).json(
            new ApiError(
                false,
                {
                    errorStack: error.stack
                        ? error.stack
                        : "Something went wrong",
                },
                "Failed",
                error.message ? error.message : "Can't get the userInformation",
                404,
            ),
        );
    }
};
