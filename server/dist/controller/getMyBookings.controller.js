import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        const bookingRes = await prisma.reservations.findMany({
            where: {
                userId: userId,
                paymentStatus: {
                    in: ["success", "refund"],
                },
            },
            select: {
                id: true,
                userId: true,
                hotelId: true,
                roomId: true,
                amountPaid: true,
                checkIn: true,
                checkOut: true,
                paymentStatus: true,
                ReservationStatus: true,
                user: {
                    select: {
                        fullName: true,
                    },
                },
                hotel: {
                    select: {
                        hotelName: true,
                        images: {
                            take: 1,
                            select: {
                                imageUrl: true,
                            }
                        },
                        host: {
                            select: {
                                id: true,
                                fullName: true,
                            }
                        },
                        address: {
                            select: {
                                street: true,
                                city: true,
                                state: true,
                                country: true,
                                longitude: true,
                                latitude: true
                            },
                        },
                    },
                },
                // payment:{
                //     select:{
                //         id: true
                //     }
                // },
                room: {
                    select: {
                        roomNumber: true,
                    },
                },
            },
        });
        if (!bookingRes) {
            return res.status(400).json(new ApiError(false, {}, "Failed", "Get all my booking failed in get bookings conroller"));
        }
        return res
            .status(200)
            .json(new ApiResponse(true, bookingRes, "Success", "Successfully fetched all bookings"));
    }
    catch (error) {
        return res
            .status(400)
            .json(new ApiError(false, { msg: error?.message, error: error }, "Failed", "Get all my booking failed and catched the erro"));
    }
};
