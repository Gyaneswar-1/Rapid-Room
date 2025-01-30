import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const getAllHotels = async (req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    try {
        const hotels = await prisma.hotels.findMany({
            skip: Number(offset),
            take: parseInt(limit),
            select: {
                id: true,
                hotelName: true,
                perNight: true,
                type: true,
                address: {
                    select: {
                        country: true,
                        city: true,
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                WishList: {
                    select: {
                        hotelId: true,
                    },
                },
                images: {
                    select: {
                        imageUrl: true
                    }
                }
            },
        });
        const totalHotels = await prisma.hotels.count();
        const totalPages = Math.ceil(totalHotels / limit);
        return res.status(200).json(new ApiResponse(true, {
            hotels,
            pagination: {
                totalHotels,
                totalPages,
                currentPage: parseInt(page),
                pageSize: parseInt(limit),
            },
        }, "success"));
    }
    catch (error) {
        return res.status(200).json(new ApiError(false, { error }, "failed"));
    }
    finally {
        prisma.$disconnect();
    }
};
