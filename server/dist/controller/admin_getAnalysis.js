import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const admin_getAnalysis = async (req, res) => {
    try {
        // Initialize counters
        let totalUsers = 0;
        let activeHosts = 0;
        let listedHotels = 0;
        let pendingUsers = 0;
        let pendingHotels = 0;
        let newSignups = 0;
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        totalUsers = await prisma.users.count();
        activeHosts = await prisma.users.count({
            where: {
                isHost: true,
                status: "APPROVED",
            },
        });
        listedHotels = await prisma.hotels.count();
        pendingUsers = await prisma.users.count({
            where: {
                isHost: true,
                status: "PENDING",
            },
        });
        pendingHotels = await prisma.hotels.count({
            where: {
                status: "PENDING",
            },
        });
        newSignups = await prisma.users.count({
            where: {
                createdAt: {
                    gte: oneHourAgo,
                },
            },
        });
        const pendingApprovals = pendingUsers + pendingHotels;
        const activeHostsPercentage = totalUsers > 0
            ? ((activeHosts / totalUsers) * 100).toFixed(2)
            : "0.00";
        const newSignupsPercentage = totalUsers > 0
            ? ((newSignups / totalUsers) * 100).toFixed(2)
            : "0.00";
        const regularUsersPercentage = totalUsers > 0
            ? (((totalUsers - activeHosts - newSignups) / totalUsers) *
                100).toFixed(2)
            : "0.00";
        return res.status(200).json(new ApiResponse(true, {
            totalUsers,
            activeHosts,
            listedHotels,
            pendingApprovals,
            pendingUsers,
            pendingHotels,
            newSignups,
            pieChartData: [
                {
                    label: "Active Hosts",
                    value: Number(activeHostsPercentage),
                    count: activeHosts,
                },
                {
                    label: "New Signups (1h)",
                    value: Number(newSignupsPercentage),
                    count: newSignups,
                },
                {
                    label: "Regular Users",
                    value: Number(regularUsersPercentage),
                    count: totalUsers - activeHosts - newSignups,
                },
            ],
        }, "Analysis data fetched successfully"));
    }
    catch (error) {
        console.error("Error getting analysis:", error);
        return res
            .status(500)
            .json(new ApiError(false, { message: error }, "Failed to get analysis data"));
    }
    finally {
        await prisma.$disconnect();
    }
};
