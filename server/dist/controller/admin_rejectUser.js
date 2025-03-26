import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
/**
 * Reject a user account by ID
 * @route PUT /api/admin/users/:userId/reject
 * @access Admin only
 */
export const admin_rejectUser = async (req, res) => {
    const { userId } = req.params;
    const { rejectionReason } = req.body; // Optional: capture reason for rejection
    if (!userId) {
        return res.status(400).json(new ApiError(false, {}, "User ID is required"));
    }
    try {
        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: {
                id: Number(userId)
            }
        });
        if (!user) {
            return res.status(404).json(new ApiError(false, {}, "User not found"));
        }
        // Update user status to REJECTED
        const updatedUser = await prisma.users.update({
            where: {
                id: Number(userId)
            },
            data: {
                status: "REJECTED"
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                isHost: true,
                status: true,
                profileImage: true,
                createdAt: true,
            }
        });
        return res.status(200).json(new ApiResponse(true, {
            user: updatedUser,
            rejectionReason: rejectionReason || "Did not meet platform requirements"
        }, "User rejected successfully"));
    }
    catch (error) {
        console.error("Error rejecting user:", error);
        return res.status(500).json(new ApiError(false, { error }, "Failed to reject user"));
    }
    finally {
        await prisma.$disconnect();
    }
};
export default admin_rejectUser;
