import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";

export const getHostEarnings = async (req: Request | any, res: Response | any) => {
    const hostId = req.user.id;

    try {
        const hotelStats = await prisma.hotels.findMany({
            where: {
                hostId: hostId,
                Payments: {
                    some: {
                        status: "success"
                    }
                }
            },
            select: {
                id: true,
                hotelName: true,
                numberOfRooms: true,
                _count: {
                    select: {
                        Reserved: true
                    }
                },
                Reserved: {
                    select: {
                        amountPaid: true,
                        ReservationStatus: true,
                        paymentStatus: true
                    }
                },
                address:{
                    select:{
                        city:true,
                        country:true
                    }
                }
            }
        });

        const formattedHotelStats = hotelStats.map(hotel => {
            const completedReservations = hotel.Reserved.filter(
                reservation => reservation.ReservationStatus === "active"
            );
            
            const totalEarnings = completedReservations.reduce(
                (sum, reservation) => sum + (reservation.amountPaid || 0), 
                0
            );
            
            const occupiedRooms = hotel.Reserved.filter(reservation => reservation.paymentStatus === "success" &&
                (reservation.ReservationStatus === "active" || 
                               reservation.ReservationStatus === "pending")
            ).length;
            
            const occupancyRate = hotel.numberOfRooms ? 
                (occupiedRooms / hotel.numberOfRooms) * 100 : 0;

            return {
                id: hotel.id,
                hotelName: hotel.hotelName,
                city: hotel.address?.city,
                country: hotel.address?.country,
                numberOfBookings: hotel._count.Reserved,
                occupancyRate: parseFloat(occupancyRate.toFixed(2)),
                totalEarnings: totalEarnings
            };
        });

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    hotelStats: formattedHotelStats
                },
                "Host earnings fetched successfully"
            )
        );
    } catch (error) {
        return res.status(500).json(
            new ApiError(false, { error }, "Failed to fetch host earnings")
        );
    } finally {
        prisma.$disconnect();
    }
};
