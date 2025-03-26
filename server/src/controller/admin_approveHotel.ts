import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";


export const admin_approveHotel = async (req: Request | any, res: Response | any) => {
    const { hotelId } = req.params;

    if (!hotelId) {
        return res.status(400).json(
            new ApiError(false, {}, "Hotel ID is required")
        );
    }

    try {
        // Check if the hotel exists
        const hotel = await prisma.hotels.findUnique({
            where: {
                id: Number(hotelId)
            }
        });

        if (!hotel) {
            return res.status(404).json(
                new ApiError(false, {}, "Hotel not found")
            );
        }

        // Update hotel status to APPROVED
        const updatedHotel = await prisma.hotels.update({
            where: {
                id: Number(hotelId)
            },
            data: {
                status: "APPROVED"
            },
            select: {
                id: true,
                hotelName: true,
                hostId: true,
                status: true,
                type: true,
                address: {
                    select: {
                        city: true,
                        country: true
                    }
                },
            }
        });

        return res.status(200).json(
            new ApiResponse(
                true,
                { hotel: updatedHotel },
                "Hotel approved successfully"
            )
        );
    } catch (error) {
        console.error("Error approving hotel:", error);
        return res.status(500).json(
            new ApiError(false, { error }, "Failed to approve hotel")
        );
    } finally {
        await prisma.$disconnect();
    }
};

export default admin_approveHotel;