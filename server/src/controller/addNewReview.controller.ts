import prisma from "../db/db.config.js";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createReview = async (req: Request | any, res: Response | any) => {

    

    try {
        const {
            hotelId,
            reviewComment,
            cleanlinessRating,
            accuracyRating,
            checkInRating,
            communicationRating,
            locationRating,
            priceRating,
            parkingRating,
        } = req.body;
        console.log(req.body);
        // Validate required fields
        if (!hotelId || !reviewComment) {
            return res
                .status(400)
                .json(
                    new ApiError(
                        false,
                        {},
                        "Failed",
                        "Error in review creation due to insufficient data",
                        400,
                    ),
                );
        }
        
        const overalRating = Math.floor((cleanlinessRating+accuracyRating+checkInRating+communicationRating+locationRating+priceRating+parkingRating)/7)

        // Create new review
        const newReview = await prisma.review.create({
            data: {
                userId: req.user.id,
                hotelId,
                reviewComment,
                overallRating: overalRating || 5,
                cleanlinessRating: cleanlinessRating || 5,
                accuracyRating: accuracyRating || 5,
                checkInRating: checkInRating || 5,
                communicationRating: communicationRating || 5,
                locationRating: locationRating || 5,
                priceRating: priceRating || 5,
                parkingRating: parkingRating || 5,
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    true,
                    { newReview },
                    "Success",
                    "Sucessfully create the review",
                ),
            );
    } catch (error: any) {
        console.error("Error creating review:", error);
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    { msg: error?.message },
                    "Failed",
                    "Error occured in the catch part",
                    400,
                ),
            );
    }
};
