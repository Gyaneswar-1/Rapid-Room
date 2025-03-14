import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { makeFakePayment } from "../helper/fakePayment.helper.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
export const reserveHotel = async (req, res) => {
    const { hotelId, reservationsDuration } = req.body;
    try {
        //initialize the tracsactio for multiple db operation
        const trancation = await prisma.$transaction(async (prisma) => {
            // check in the hotel room is availabe or not
            const isAvailable = await prisma.hotels.findUnique({
                where: {
                    id: hotelId,
                    isAllReserved: false,
                },
                select: {
                    id: true,
                    isAllReserved: true,
                    numberOfEmptyRooms: true,
                    perNight: true,
                    hotelName: true,
                },
            });
            if (!isAvailable) {
                return res
                    .status(500)
                    .json(new ApiError(false, {}, "Failed", "No room's are available", 500));
            }
            const totalAmount = reservationsDuration * isAvailable?.perNight;
            //make the payment
            const doFakePayment = await makeFakePayment({
                hotelId: hotelId,
                userId: req.user.id,
                amount: totalAmount,
                paymentMethod: "UPI",
                status: "successfull",
            });
            if (doFakePayment.success === false) {
                return res
                    .status(500)
                    .json(new ApiError(false, {}, "Failed", "Payment was uncussessfull", 500));
            }
            //reserve the room process
            // step 1 find non reserve room
            const nonReserveRoom = await prisma.rooms.findFirst({
                where: {
                    hotelId: hotelId,
                    isReserved: false,
                },
                select: {
                    roomNumber: true,
                    id: true,
                },
            });
            if (!nonReserveRoom) {
                return res
                    .status(500)
                    .json(new ApiError(false, {}, "Failed", "Can't do the reservation all room are booked", 500));
            }
            // stpe 2 reserve the room
            const reserveRoom = await prisma.reservations.create({
                data: {
                    userId: req.user.id,
                    hotelId: hotelId,
                    roomId: nonReserveRoom.id,
                    checkIn: new Date(),
                    reservationsDuration: reservationsDuration,
                    checkOut: new Date(new Date().getTime() +
                        reservationsDuration * 24 * 60 * 60 * 1000),
                },
                select: {
                    id: true,
                    hotelId: true,
                    roomId: true,
                    hotel: {
                        select: {
                            hotelName: true,
                            perNight: true,
                        },
                    },
                    room: {
                        select: {
                            roomNumber: true,
                        },
                    },
                },
            });
            if (!reserveRoom) {
                return res
                    .status(500)
                    .json(new ApiError(false, {}, "Failed", "Can't do the reservation so internal issue", 500));
            }
            //update the room status
            const updateRoomStatus = await prisma.rooms.update({
                where: {
                    id: nonReserveRoom.id,
                },
                data: {
                    isReserved: true,
                },
            });
            if (!updateRoomStatus) {
                return res
                    .status(400)
                    .json(new ApiError(false, {}, "Failed", "Cant update the room Status", 400));
            }
            //update the hotel availablity of rooms
            const updateHotel = await prisma.hotels.update({
                where: {
                    id: hotelId,
                },
                data: {
                    numberOfEmptyRooms: isAvailable?.numberOfEmptyRooms - 1,
                    isAllReserved: isAvailable?.numberOfEmptyRooms === 1 ? true : false,
                },
            });
            if (!updateHotel) {
                return res
                    .status(500)
                    .json(new ApiError(false, {}, "Failed", "Can't do the reservation some internal issue", 500));
            }
            //send the succes mail to the user
            const mailRes = await sendEmail({
                to: req.user.email,
                subject: "Hotel booked successfully",
                text: `
                Hotel: ${isAvailable.hotelName}
                Room number: ${reserveRoom.room.roomNumber}
                Checkin date: ${`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}
                Pernight cost: ${isAvailable.perNight}
                Total cost: ${totalAmount}

                `,
            });
            return res.status(200).json(new ApiResponse(true, { reserveRoom, totalAmount: totalAmount }, "Successfull", "Successfully reserved the room", 200));
        });
    }
    catch (error) {
        return res
            .status(500)
            .json(new ApiError(false, {}, "Failed", "Can't do the reservation", 500));
    }
};
//alogrithm
//1. get the necessary information
//2. check there is rooms are available or not
//3. if available then make the payment
//4. find the non reserved room
//4. if payment successfull reserve the room
//5. After reserve the room update the hotel availabe rooms and isAvailable status
