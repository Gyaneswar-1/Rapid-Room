import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";

export const getWishlist = async (
    req: Request | any,
    res: Response | any,
) => {
    try {
        const result = await prisma.wishList.findMany({
            where: {
                userId: req.user.id,
            },
            include: {
                hotel: true,
            },
        });

        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "Wishlist retrieved successfully!"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiError(false, { error }, "Unable to retrieve wishlist"));
    }finally{
        prisma.$disconnect()
    }
};