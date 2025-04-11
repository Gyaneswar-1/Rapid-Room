import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";

export const addWishlist = async (req: Request | any, res: Response | any) => {
    const { hotelId } = req.body;
    console.log(hotelId);
    console.log(req.user.id);
    
    
    try {
        const result = await prisma.wishList.create({
            data: {
                userId:req.user.id,
                hotelId:hotelId,
            },
        });
        console.log(result);
        return res
            .status(200)
            .json(new ApiResponse(true, {result}, "Wishlist added!"));
    } catch (error: any) {
        return res
            .status(500)
            .json(new ApiError(false, error, "Failed to add wishlist!"));
    } finally {
        prisma.$disconnect();
    }
};
