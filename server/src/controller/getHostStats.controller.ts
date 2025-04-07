import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getHostStats = async (req: Request | any, res: Response | any) => {
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

        // Get total bookings
        const TotalBookings = await prisma.payments.count();

        // Get hotels belonging to current user
        const userHotels = await prisma.hotels.findMany({
            where: {
                id: userId,
            },
        });

        // Count total rooms across all hotels of the current user
        const totalRooms = userHotels.reduce(
            (sum, hotel) => sum + (hotel.numberOfRooms || 0),
            0,
        );

        // Calculate average rooms per hotel
        const averageRoomsPerHotel =
            userHotels.length > 0 ? totalRooms / userHotels.length : 0;

        // Get general occupancy rate
        const OccupancyRate = await prisma.hotels.aggregate({
            _avg: {
                numberOfRooms: true,
            },
        });

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    totalRevenue,
                    TotalBookings,
                    OccupancyRate,
                    userHotelStats: {
                        totalHotels: userHotels.length,
                        totalRooms,
                        averageRoomsPerHotel,
                    },
                },
                "success data",
                "success",
                200,
            ),
        );
    } catch (error) {
        return res.status(500).json(new ApiError(false, {}, "failed"));
    }
};
