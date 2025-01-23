import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";

export const deleteReview = async (req: Request | any, res: Response | any) => {
    const { hid,rid } = req.body;
    try {
        const result = await prisma.review.delete({
            where: {
                id:rid,
                userId: req.user.id,
                hotelId: hid,
            }
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "success"));
    } catch (error) {
        return res.status(500).json(new ApiError(false, { error }, "Error"));
    }
};