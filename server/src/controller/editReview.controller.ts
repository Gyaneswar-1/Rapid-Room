import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export const editReview = async (req: Request, res: Response | any) => {
    const { rid, rate, content } = req.body;

    try {
        const review = await prisma.review.findUnique({
            where: {
                id: rid,
            },
            select: {
                id: true,
                overallRating: true,
                reviewComment: true,
            },
        });

        if (!review) {
            return res.status(404).json(new ApiError(false,{} ,"Review not found"));
        }


        const result = await prisma.review.update({
            where: {
                id: rid,
            },
            data: {
                overallRating: rate !== undefined ? rate : review.overallRating,
                reviewComment: content !== undefined ? content : review.reviewComment,
            },
        });
        return res.status(200).json(new ApiResponse(true, result, "Review updated successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(false,{error}))
    }
};
