import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";

export const deleteReview = async (req: Request | any, res: Response | any) => {
    const { hid, rid } = req.body;
    try {
        // Use transaction to handle review deletion and hotel rating update
        const [deletedReview, updatedHotel] = await prisma.$transaction(
            async (prisma) => {
                // Get the review data before deleting it
                const reviewToDelete = await prisma.review.findUnique({
                    where: {
                        id: rid,
                        userId: req.user.id,
                        hotelId: hid,
                    },
                    select: {
                        overallRating: true,
                    },
                });

                if (!reviewToDelete) {
                    throw new Error(
                        "Review not found or you don't have permission to delete it",
                    );
                }

                // Get current hotel data
                const hotel = await prisma.hotels.findUnique({
                    where: { id: hid },
                    select: { overalRating: true, totalReviews: true },
                });

                if (!hotel) throw new Error("Hotel not found");

                // Delete the review
                const deletedReview = await prisma.review.delete({
                    where: {
                        id: rid,
                        userId: req.user.id,
                        hotelId: hid,
                    },
                });

                // Calculate new total reviews and overall rating
                const newTotalReviews = hotel.totalReviews - 1;
                let newOverallRating = 0;

                if (newTotalReviews > 0) {
                    // Subtract the deleted review's rating from the total and recalculate
                    newOverallRating = Math.round(
                        (hotel.overalRating * hotel.totalReviews -
                            reviewToDelete.overallRating) /
                            newTotalReviews,
                    );
                }

                // Update hotel ratings
                const updatedHotel = await prisma.hotels.update({
                    where: { id: hid },
                    data: {
                        totalReviews: newTotalReviews,
                        overalRating:
                            newTotalReviews > 0 ? newOverallRating : 0,
                    },
                });

                return [deletedReview, updatedHotel];
            },
        );

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    deletedReview,
                    hotelRating: {
                        totalReviews: updatedHotel.totalReviews,
                        overalRating: updatedHotel.overalRating,
                    },
                },
                "Review deleted successfully and hotel ratings updated",
            ),
        );
    } catch (error: any) {
        console.error("Error deleting review:", error);
        return res
            .status(500)
            .json(
                new ApiError(
                    false,
                    { error: error?.message || error },
                    "Failed to delete review",
                    error?.message ||
                        "An error occurred while deleting the review",
                    500,
                ),
            );
    }
};
