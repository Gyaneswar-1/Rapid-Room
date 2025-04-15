import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const admin_getAllHosts = async (req, res) => {
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
            where: { isHost: true },
            select: {
                id: true,
                fullName: true,
                email: true,
                isEmailVerified: true,
                profileImage: true,
                address: {
                    select: {
                        country: true,
                        state: true,
                        city: true,
                        street: true,
                        longitude: true,
                        latitude: true,
                    }
                },
                phoneNumber: true,
                isHost: true,
                GovID: true,
                createdAt: true,
                status: true,
                listedHotels: {
                    select: {
                        id: true,
                        hotelName: true,
                        images: {
                            take: 1,
                            select: {
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        });
        // Properly serialize all potential BigInt values to strings
        const serializedUsers = users.map(user => {
            // Convert the user object to handle BigInts
            const serializedUser = JSON.parse(JSON.stringify(user, (key, value) => typeof value === 'bigint' ? value.toString() : value));
            // Ensure phoneNumber is converted to string if it exists
            if (serializedUser.phoneNumber) {
                serializedUser.phoneNumber = String(serializedUser.phoneNumber);
            }
            return serializedUser;
        });
        // Count only hosts, not all users
        const totalHosts = Number(await prisma.users.count({
            where: { isHost: true }
        }));
        const totalPages = Math.ceil(totalHosts / limit);
        return res.status(200).json(new ApiResponse(true, {
            users: serializedUsers,
            pagination: {
                totalUsers: totalHosts,
                totalPages,
                currentPage: page,
                pageSize: limit,
            },
        }, "Hosts fetched successfully"));
    }
    catch (error) {
        console.error("Error fetching hosts:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return res.status(500).json(new ApiError(false, { message: errorMessage }, "Failed to fetch hosts"));
    }
    finally {
        await prisma.$disconnect();
    }
};
