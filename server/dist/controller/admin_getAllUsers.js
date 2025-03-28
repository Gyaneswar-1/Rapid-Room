import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const admin_getAllUsers = async (req, res) => {
    try {
        // Set default values and convert to numbers
        const page = parseInt(req.query.page || "1");
        const limit = parseInt(req.query.limit || "10");
        // Validate pagination parameters
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            return res.status(400).json(new ApiError(false, {}, "Invalid pagination parameters"));
        }
        const offset = (page - 1) * limit;
        const users = await prisma.users.findMany({
            skip: offset,
            take: limit,
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
            },
        });
        console.log(users);
        // Convert BigInt values to strings before JSON serialization
        const serializedUsers = users.map(user => ({
            ...user,
            phoneNumber: user.phoneNumber ? String(user.phoneNumber) : null,
        }));
        const totalUsers = await prisma.users.count();
        const totalPages = Math.ceil(totalUsers / limit);
        return res.status(200).json(new ApiResponse(true, {
            users: serializedUsers, // Use serialized users, not the original
            pagination: {
                totalUsers,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        }, "Users fetched successfully"));
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json(new ApiError(false, {}, "Failed to fetch users "));
    }
    finally {
        await prisma.$disconnect();
    }
};
