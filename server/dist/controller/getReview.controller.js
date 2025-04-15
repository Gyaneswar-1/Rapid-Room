import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const getReview = async (req, res) => {
    const { hotelId } = req.body;
    if (!hotelId) {
        return res
            .status(400)
            .json(new ApiError(false, {}, "Failed", "Hotel ID is required", 400));
    }
    try {
        const hotelReviews = await prisma.review.findMany({
            where: {
                hotelId: parseInt(hotelId),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        // Calculate average ratings
        const ratings = hotelReviews.reduce((acc, review) => ({
            overallRating: acc.overallRating + review.overallRating,
            cleanlinessRating: acc.cleanlinessRating + review.cleanlinessRating,
            accuracyRating: acc.accuracyRating + review.accuracyRating,
            checkInRating: acc.checkInRating + review.checkInRating,
            communicationRating: acc.communicationRating + review.communicationRating,
            locationRating: acc.locationRating + review.locationRating,
            priceRating: acc.priceRating + review.priceRating,
            parkingRating: acc.parkingRating + review.parkingRating,
        }), {
            overallRating: 0,
            cleanlinessRating: 0,
            accuracyRating: 0,
            checkInRating: 0,
            communicationRating: 0,
            locationRating: 0,
            priceRating: 0,
            parkingRating: 0,
        });
        const reviewCount = hotelReviews.length;
        const averageRatings = reviewCount > 0
            ? Object.fromEntries(Object.entries(ratings).map(([key, value]) => [
                key,
                Number((value / reviewCount).toFixed(1)),
            ]))
            : ratings;
        // Format the response
        const formattedReviews = hotelReviews.map((review) => ({
            id: review.id,
            comment: review.reviewComment,
            ratings: {
                overall: review.overallRating,
                cleanliness: review.cleanlinessRating,
                accuracy: review.accuracyRating,
                checkIn: review.checkInRating,
                communication: review.communicationRating,
                location: review.locationRating,
                price: review.priceRating,
                parking: review.parkingRating,
            },
            user: {
                name: review.user.fullName,
                profileImage: review.user.profileImage || null,
            },
            createdAt: review.createdAt,
        }));
        return res.status(200).json(new ApiResponse(true, {
            reviews: formattedReviews,
            averageRatings,
            totalReviews: reviewCount,
        }, "Reviews retrieved successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new ApiError(false, { error: error.message }, "Failed", "Error fetching reviews", 500));
    }
};
