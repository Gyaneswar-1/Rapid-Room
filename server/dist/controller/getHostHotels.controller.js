import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const getHostHotels = async (req, res) => {
    try {
        const hotels = await prisma.hotels.findMany({
            where: {
                hostId: req.user.id,
            },
            select: {
                id: true,
                hotelName: true,
                images: {
                    select: {
                        imageUrl: true,
                    },
                },
                address: {
                    select: {
                        country: true,
                        city: true,
                    },
                },
                reviews: {
                    select: {
                        overallRating: true,
                    },
                },
                rooms: {
                    select: {
                        isReserved: true,
                    },
                },
                numberOfRooms: true,
                status: true
            },
        });
        const result = hotels.map((hotel) => {
            // Count total number of ratings
            const ratingCount = hotel.reviews.length;
            // Calculate percentage of booked rooms
            const totalRooms = hotel.numberOfRooms || hotel.rooms.length;
            const bookedRooms = hotel.rooms.filter((room) => room.isReserved).length;
            const bookedPercentage = totalRooms > 0 ? (bookedRooms / totalRooms) * 100 : 0;
            return {
                id: hotel.id,
                hotelName: hotel.hotelName,
                address: hotel.address,
                ratingCount: ratingCount,
                bookedRoomsPercentage: parseFloat(bookedPercentage.toFixed(2)),
                reviews: hotel.reviews,
                images: hotel.images.map(image => image.imageUrl),
                status: hotel.status
            };
        });
        return res
            .status(200)
            .json(new ApiResponse(true, result, "Hotel statistics retrieved successfully", "success", 200));
    }
    catch (error) {
        console.error("Error in getHostStats:", error);
        return res
            .status(500)
            .json(new ApiError(false, {}, "Failed to retrieve hotel statistics"));
    }
};
