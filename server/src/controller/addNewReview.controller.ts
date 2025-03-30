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

        const overalRating = Math.floor(
            (cleanlinessRating +
                accuracyRating +
                checkInRating +
                communicationRating +
                locationRating +
                priceRating +
                parkingRating) /
                7,
        );

        // Use transaction to update both review and hotel
        const [newReview, updatedHotel] = await prisma.$transaction(
            async (prisma) => {
                // Create the review
                const review = await prisma.review.create({
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

                // Get current hotel data
                const hotel = await prisma.hotels.findUnique({
                    where: { id: hotelId },
                    select: { overalRating: true, totalReviews: true },
                });

                if (!hotel) throw new Error("Hotel not found");

                // Calculate new overall rating
                const newTotalReviews = hotel.totalReviews + 1;
                const newOverallRating = Math.round(
                    (hotel.overalRating * hotel.totalReviews + overalRating) /
                        newTotalReviews,
                );

                // Update hotel ratings
                const updatedHotel = await prisma.hotels.update({
                    where: { id: hotelId },
                    data: {
                        totalReviews: newTotalReviews,
                        overalRating: newOverallRating,
                    },
                });

                return [review, updatedHotel];
            },
        );

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    newReview,
                    hotelRating: {
                        totalReviews: updatedHotel.totalReviews,
                        overalRating: updatedHotel.overalRating,
                    },
                },
                "Successfully created the review and updated hotel ratings",
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
