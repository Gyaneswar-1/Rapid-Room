import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import logger from "../utils/Logger.js";

export const addNewReview = async (req: Request | any, res: Response | any) => {
    const { hid, rate, content } = req.body;
    logger.info(req.user.id,hid,rate,content)
    try {
        const result = await prisma.review.create({
            data: {
                userId: req.user.id,
                hotelId: hid,
                rating: rate,
                comment: content,
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "success"));
    } catch (error) {
        return res.status(500).json(new ApiError(false, { error }, "Error"));
    } finally {
        prisma.$disconnect();
    }
};
