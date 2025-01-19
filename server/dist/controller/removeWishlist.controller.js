import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const removeWishlist = async (req, res) => {
    const { userId, hotelId } = req.body;
    try {
        const result = await prisma.wishList.deleteMany({
            where: {
                userId: parseInt(userId),
                hotelId: parseInt(hotelId),
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "Wishlist removed!"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new ApiError(true, {}, "unable to remove wishlist"));
    }
    finally {
        prisma.$disconnect();
    }
};
