import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";

export const addNewHotel = async (req: Request | any, res: Response | any) => {
    const {
        id,
        hotelName,
        state,
        street,
        city,
        zipcode,
        country,
        description,
        perNight,
        hasParking,
        hasPools,
        hasWifi,
        type,
    } = req.body;
    try {
        const isAllowed = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                isOwner: true,
            },
        });

        if (isAllowed?.isOwner === true) {
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        false,
                        {},
                        "access",
                        "you have  access to add hotels !",
                        201,
                    ),
                );
        }
        if (isAllowed?.isOwner === false) {
            return res
                .status(501)
                .json(
                    new ApiResponse(
                        false,
                        {},
                        "no access",
                        "you have no access to add hotels !",
                        501,
                    ),
                );
        }
    } catch (error) {
        res.status(501).json(new ApiError(false,{ error }));
    }
};
