import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const getHostStats = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        const totalRevenue = await prisma.payments.aggregate({
            _sum: {
                hostAmount: true,
            },
            where: {
                hotel: {
                    hostId: userId,
                },
            },
        });
        const TotalBookings = await prisma.reservations.count({
            where: {
                hotel: {
                    hostId: userId,
                },
            },
        });
        const userHotels = await prisma.hotels.findMany({
            where: {
                hostId: userId,
            },
        });
        const totalRooms = userHotels.reduce((sum, hotel) => sum + (hotel.numberOfRooms || 0), 0);
        const averageRoomsPerHotel = userHotels.length > 0 ? totalRooms / userHotels.length : 0;
        const OccupancyRate = await prisma.hotels.aggregate({
            _avg: {
                numberOfRooms: true,
            },
            where: {
                hostId: userId,
            },
        });
        const averageRatingResult = await prisma.hotels.aggregate({
            _avg: {
                overalRating: true,
            },
            where: {
                hostId: userId,
            },
        });
        const averageRating = averageRatingResult._avg.overalRating || 0;
        const totalPendingPayments = await prisma.payments.count({
            where: {
                hotel: {
                    hostId: userId,
                },
                status: "pending",
            },
        });
        const totalReservations = await prisma.reservations.count({
            where: {
                hotel: {
                    hostId: userId,
                },
            },
        });
        const monthlyPayments = await prisma.payments.groupBy({
            by: [
                "paymentDate"
            ],
            _sum: {
                amount: true,
            },
            where: {
                hotel: {
                    hostId: userId,
                },
            },
            orderBy: {
                paymentDate: "asc",
            },
        });
        return res.status(200).json(new ApiResponse(true, {
            totalRevenue,
            TotalBookings,
            OccupancyRate,
            averageRating,
            totalPendingPayments,
            totalReservations,
            monthlyPayments,
            userHotelStats: {
                totalHotels: userHotels.length,
                totalRooms,
                averageRoomsPerHotel,
            },
        }, "success data", "success", 200));
    }
    catch (error) {
        console.log("error", error);
        return res.status(500).json(new ApiError(false, {}, "failed"));
    }
};
