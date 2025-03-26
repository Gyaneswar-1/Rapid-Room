import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const admin_getAllUsers = async (req: Request | any, res: Response | any) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const users = await prisma.users.findMany({
            skip: Number(offset),
            take: parseInt(limit),
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                isHost: true,
                profileImage: true,
                createdAt: true,
                status:true,
                address: {
                    select: {
                        country: true,
                        city: true,
                        state: true,
                    },
                },
            },
        });

        const totalUsers = await prisma.users.count();
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    users,
                    pagination: {
                        totalUsers,
                        totalPages,
                        currentPage: parseInt(page),
                        pageSize: parseInt(limit),
                    },
                },
                "Users fetched successfully"
            ),
        );
    } catch (error) {
        return res.status(500).json(new ApiError(false, { error }, "Failed to fetch users"));
    } finally {
        prisma.$disconnect();
    }
};