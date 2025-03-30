import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";


export const admin_approveHost = async (req: Request | any, res: Response | any) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json(
            new ApiError(false, {}, "User ID is required")
        );
    }

    try {
        // Check if the user exists
        const user = await prisma.users.findUnique({
            where: {
                id: Number(userId)
            }
        });

        if (!user) {
            return res.status(404).json(
                new ApiError(false, {}, "User not found")
            );
        }

        // Update user status to APPROVED
        const updatedUser = await prisma.users.update({
            where: {
                id: Number(userId)
            },
            data: {
                status: "APPROVED"
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

        return res.status(200).json(
            new ApiResponse(
                true,
                { user: updatedUser },
                "User approved successfully"
            )
        );
    } catch (error) {
        console.error("Error approving user:", error);
        return res.status(500).json(
            new ApiError(false, { error }, "Failed to approve user")
        );
    } finally {
        await prisma.$disconnect();
    }
};

