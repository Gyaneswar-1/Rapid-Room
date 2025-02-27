import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export const createAdmin = async (req: Request | any, res: Response | any) => {
    const { GovID, phoneNo, country, state, street, city, zipcode } = req.body;

    try {
        const isHost = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });

        if (isHost?.isHost === false) {
            const result = await prisma.users.update({
                where: {
                    id: req.user.id,
                },
                data: {
                    isHost: true,
                    GovID: GovID ? parseInt(GovID) : null,
                    phoneNumber: phoneNo ? parseInt(phoneNo) : null,
                    address: {
                        create: {
                            street: street,
                            state: state,
                            city: city,
                            zipCode: zipcode,
                            country: country,
                        },
                    },
                },
                include: { address: true },
            });
            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        { result },
                        "success to send the data",
                        "success",
                        200,
                    ),
                );
        } else {
            return res
                .status(404)
                .json(
                    new ApiResponse(
                        false,
                        {},
                        "host data cannot be changed",
                        "User is already a host",
                        404,
                    ),
                );
        }
    } catch (error: any) {
        return res
            .status(500)
            .json(new ApiError(false, error, "failed to send ", "failed", 500));
    }
};
