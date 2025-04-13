import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getHostTodayCheckins = async (
    req: Request | any,
    res: Response | any,
) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        // Find hotels owned by the host
        const hotels = await prisma.hotels.findMany({
            where: {
                hostId: req.user.id,
            },
            select: {
                id: true,
            },
        });

        const hotelIds = hotels.map((hotel) => hotel.id);

        const bookings = await prisma.reservations.findMany({
            where: {
                hotelId: {
                    in: hotelIds,
                },
                checkIn: {
                    gte: today, // Check-in date is today or later
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Check-in date is before tomorrow
                },
            },
            include: {
                user: {
                    select: {
                        fullName:true,
                        email: true,
                        profileImage: true,
                    },
                },
                room: {
                    select: {
                        roomNumber: true,
                    },
                },
                payment: {
                    select: {
                        status: true,
                    },
                },
                hotel: {
                    select: {
                        hotelName:true,
                        images: {
                            select: {
                                imageUrl: true,
                            },
                            take: 1,
                        },
                    },
                },
            },
        });

        const result = bookings.map((booking) => {
            // Calculate the number of days of stay
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const numberOfDays = Math.ceil(
                (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24),
            );

            return {
                bookingId: booking.id,
                roomNumber: booking.room?.roomNumber,
                guestName: booking.user.fullName,
                guestEmail: booking.user.email,
                guestProfile: booking.user.profileImage,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                numberOfDays: numberOfDays,
                paymentStatus: booking.payment?.status || "Pending",
                hotelImage: booking.hotel?.images[0]?.imageUrl || null,
                hotelName: booking.hotel?.hotelName,
            };
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    true,
                    result,
                    "Today's check-ins retrieved successfully",
                    "success",
                    200,
                ),
            );
    } catch (error) {
        console.error("Error in getHostTodayCheckins:", error);
        return res
            .status(500)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed to retrieve today's check-ins",
                ),
            );
    }
};