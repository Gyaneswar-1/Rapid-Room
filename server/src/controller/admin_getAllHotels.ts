import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const admin_getAllHotels = async (req: Request | any, res: Response | any) => {
    // Set default values for pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    try {
        const hotels = await prisma.hotels.findMany({
            skip: Number(offset),
            take: Number(limit), // Fix: Ensure take is explicitly included and is a number
            select: {
                id: true,
                hotelName: true,
                perNight: true,
                type: true,
                status: true, // Include status to show pending/approved/rejected
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
                images: {
                    select: {
                        imageUrl: true
                    }
                }
            },
        });

        const totalHotels = await prisma.hotels.count();

        const totalPages = Math.ceil(totalHotels / limit);
        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    hotels,
                    pagination: {
                        totalHotels,
                        totalPages,
                        currentPage: page,
                        pageSize: limit,
                    },
                },
                "Hotels fetched successfully",
            ),
        );
    } catch (error) {
        console.error("Error fetching hotels:", error);
        return res.status(500).json(new ApiError(false, { error }, "Failed to fetch hotels"));
    } finally {
        prisma.$disconnect();
    }
};