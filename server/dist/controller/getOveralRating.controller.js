import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const getOverallRatings = async (req, res) => {
    try {
        const { hotelId } = req.body;
        if (!hotelId) {
            return res
                .status(400)
                .json(new ApiError(false, {}, "Failed", "Hotel ID is required", 400));
        }
        // Get all reviews with their ratings
        const hotelWithReviews = await prisma.hotels.findUnique({
            where: {
                id: parseInt(hotelId),
            },
            include: {
                reviews: {
                    select: {
                        overallRating: true,
                        cleanlinessRating: true,
                        accuracyRating: true,
                        checkInRating: true,
                        communicationRating: true,
                        locationRating: true,
                        priceRating: true,
                        parkingRating: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!hotelWithReviews || hotelWithReviews.reviews.length === 0) {
            return res.status(200).json(new ApiResponse(true, {
                hotelId,
                totalReviews: 0,
                averageRatings: {
                    overall: 0,
                    cleanliness: 0,
                    accuracy: 0,
                    checkIn: 0,
                    communication: 0,
                    location: 0,
                    price: 0,
                    parking: 0,
                },
                ratingDistribution: {
                    5: 0,
                    4: 0,
                    3: 0,
                    2: 0,
                    1: 0,
                },
            }, "No reviews found"));
        }
        const reviews = hotelWithReviews.reviews;
        const totalReviews = reviews.length;
        // Calculate distribution of overall ratings
        const ratingDistribution = reviews.reduce((acc, review) => {
            acc[review.overallRating] =
                (acc[review.overallRating] || 0) + 1;
            return acc;
        }, {});
        // Calculate detailed average ratings
        const ratingTotals = reviews.reduce((acc, review) => ({
            overall: acc.overall + review.overallRating,
            cleanliness: acc.cleanliness + review.cleanlinessRating,
            accuracy: acc.accuracy + review.accuracyRating,
            checkIn: acc.checkIn + review.checkInRating,
            communication: acc.communication + review.communicationRating,
            location: acc.location + review.locationRating,
            price: acc.price + review.priceRating,
            parking: acc.parking + review.parkingRating,
        }), {
            overall: 0,
            cleanliness: 0,
            accuracy: 0,
            checkIn: 0,
            communication: 0,
            location: 0,
            price: 0,
            parking: 0,
        });
        // Calculate averages with one decimal place
        const averageRatings = Object.fromEntries(Object.entries(ratingTotals).map(([key, total]) => [
            key,
            Number((total / totalReviews).toFixed(1)),
        ]));
        // Format rating distribution
        const formattedDistribution = {
            5: ratingDistribution[5] || 0,
            4: ratingDistribution[4] || 0,
            3: ratingDistribution[3] || 0,
            2: ratingDistribution[2] || 0,
            1: ratingDistribution[1] || 0,
        };
        return res.status(200).json(new ApiResponse(true, {
            hotelId,
            totalReviews,
            averageRatings,
        }, "Ratings retrieved successfully"));
    }
    catch (error) {
        console.error("Error fetching ratings:", error);
        return res
            .status(500)
            .json(new ApiError(false, { error: error.message }, "Failed", "Error calculating ratings", 500));
    }
};
