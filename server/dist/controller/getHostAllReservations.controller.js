import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const getHostAllReservations = async (req, res) => {
    const hostId = req.user.id;
    try {
        const reservations = await prisma.reservations.findMany({
            where: {
                hotel: {
                    hostId: hostId
                }
            },
            select: {
                id: true, //
                checkIn: true, //
                checkOut: true, //
                amountPaid: true, //
                reservationsDuration: true, //
                ReservationStatus: true, //
                paymentStatus: true, //
                hotel: {
                    select: {
                        hotelName: true,
                    }
                },
                user: {
                    select: {
                        fullName: true,
                        profileImage: true
                    }
                },
                payment: {
                    select: {
                        amount: true,
                    }
                }
            },
            orderBy: {
                checkIn: 'asc'
            }
        });
        // Return formatted response without pagination
        return res.status(200).json(new ApiResponse(true, {
            reservations,
        }, "Host reservations fetched successfully"));
    }
    catch (error) {
        return res.status(500).json(new ApiError(false, { error }, "Failed to fetch host reservations"));
    }
    finally {
        prisma.$disconnect();
    }
};
