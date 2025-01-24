import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const addWishlist = async (req, res) => {
    const { hotelId } = req.body;
    try {
        const result = await prisma.wishList.create({
            data: {
                userId: req.user.id,
                hotelId,
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "Wishlist added!"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new ApiError(false, error, "Failed to add wishlist!"));
    }
    finally {
        prisma.$disconnect();
    }
};
