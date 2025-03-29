import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const admin_getAllHosts = async (req: Request | any, res: Response | any) => {
    try {
        // Set default values and convert to numbers
        const page = parseInt(req.query.page || "1");
        const limit = parseInt(req.query.limit || "10");
        
        // Validate pagination parameters
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            return res.status(400).json(
                new ApiError(false, {}, "Invalid pagination parameters")
            );
        }
        
        const offset = (page - 1) * limit;
        
        
        const users = await prisma.users.findMany({
            skip: offset,
            take: limit,
            where: { isHost: true },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                isHost: true,
                profileImage: true,
                createdAt: true,
                status: true,
                address: {
                    select: {
                        country: true,
                        city: true,
                        state: true,
                    },
                },
            }
        });

        const serializedUsers = users.map(user => ({
            ...user,
            phoneNumber: user.phoneNumber ? String(user.phoneNumber) : null,
        }));
        
        // Count only hosts, not all users
        const totalHosts = await prisma.users.count({
            where: { isHost: true }
        });
        
        const totalPages = Math.ceil(totalHosts / limit);

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    users: serializedUsers,
                    pagination: {
                        totalUsers: totalHosts,
                        totalPages,
                        currentPage: page,
                        pageSize: limit,
                    },
                },
                "Hosts fetched successfully"
            ),
        );
    } catch (error) {
        console.error("Error fetching hosts:", error);
        return res.status(500).json(new ApiError(false, {}, "Failed to fetch hosts"));
    } finally {
        await prisma.$disconnect();
    }
};