import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const getHostTodayCheckins = async (req, res) => {
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
                        id: true,
                        fullName: true,
                        email: true,
                        profileImage: true,
                    },
                },
                room: {
                    select: {
                        id: true,
                        roomNumber: true,
                    },
                },
                payment: {
                    select: {
                        id: true,
                        status: true,
                        amount: true,
                        paymentDate: true,
                        paymentMethod: true,
                    },
                },
                hotel: {
                    select: {
                        id: true,
                        hotelName: true,
                        images: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
        const result = bookings.map((booking) => {
            // Calculate the number of days of stay
            const checkInDate = new Date(booking.checkIn);
            const checkOutDate = new Date(booking.checkOut);
            const numberOfDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
            return {
                id: booking.id,
                bookingId: booking.id,
                guestName: booking.user.fullName,
                guestEmail: booking.user.email,
                guestProfile: booking.user.profileImage,
                hotelName: booking.hotel?.hotelName,
                hotelImage: booking.hotel?.images[0]?.imageUrl || null,
                roomNumber: booking.room?.roomNumber,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                numberOfDays: numberOfDays,
                reservationsDuration: booking.reservationsDuration || numberOfDays,
                paymentStatus: booking.paymentStatus || "pending",
                reservationStatus: booking.ReservationStatus || "pending", // Use the field name from schema
                amountPaid: booking.amountPaid || booking.payment?.amount || 0,
                // Nested objects to match the interface
                hotel: {
                    hotelName: booking.hotel?.hotelName,
                    images: booking.hotel?.images || [],
                },
                room: {
                    roomNumber: booking.room?.roomNumber,
                },
                user: {
                    fullName: booking.user.fullName,
                    email: booking.user.email,
                    profileImage: booking.user.profileImage,
                },
                payment: {
                    paymentDate: booking.payment?.paymentDate,
                    amount: booking.payment?.amount || booking.amountPaid || 0,
                },
            };
        });
        return res
            .status(200)
            .json(new ApiResponse(true, result, "Today's check-ins retrieved successfully", "success", 200));
    }
    catch (error) {
        console.error("Error in getHostTodayCheckins:", error);
        return res
            .status(500)
            .json(new ApiError(false, {}, "Failed to retrieve today's check-ins"));
    }
};
