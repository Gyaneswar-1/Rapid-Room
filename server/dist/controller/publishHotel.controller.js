import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const publishHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        if (!hotelId) {
            return res
                .status(400)
                .json(new ApiError(false, {}, "Validation Error", "Hotel ID is required", 400));
            const hotel = await prisma.hotels.findFirst({
                where: { id: parseInt(hotelId) },
            });
            if (!hotel) {
                return res
                    .status(404)
                    .json(new ApiError(false, {}, "Not Found", "Hotel not found or already published", 404));
            }
            const updatedHotel = await prisma.hotels.update({
                where: { id: parseInt(hotelId) },
                data: {
                    status: "PENDING",
                },
            });
            return res
                .status(200)
                .json(new ApiResponse(true, updatedHotel, "Success", "Hotel published successfully", 200));
        }
    }
    catch (error) {
        console.error("Error publishing hotel:", error);
        return res
            .status(500)
            .json(new ApiError(false, {}, "Server Error", "Failed to publish hotel", 500));
    }
    finally {
        prisma.$disconnect();
    }
};
