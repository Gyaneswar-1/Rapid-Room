import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";


export const admin_rejectHotel = async (req: Request | any, res: Response | any) => {
    const { hotelId } = req.params;
    const { rejectionReason } = req.body; // Optional: capture reason for rejection

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

        // Update hotel status to REJECTED
        const updatedHotel = await prisma.hotels.update({
            where: {
                id: Number(hotelId)
            },
            data: {
                status: "REJECTED"
                // If you had a rejectionReason field in your schema, you could add:
                // rejectionReason: rejectionReason || "Did not meet platform standards"
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
                { 
                    hotel: updatedHotel,
                    rejectionReason: rejectionReason || "Did not meet platform standards"
                },
                "Hotel rejected successfully"
            )
        );
    } catch (error) {
        console.error("Error rejecting hotel:", error);
        return res.status(500).json(
            new ApiError(false, { error }, "Failed to reject hotel")
        );
    } finally {
        await prisma.$disconnect();
    }
};

export default admin_rejectHotel;