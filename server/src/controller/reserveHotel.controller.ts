import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";

type reservationType = {
    hotelId: number;
    checkIn: string;
    checkOut: string;
};

export const reserveHotel = async (req: Request | any, res: Response | any) => {
    const { hotelId, checkIn, checkOut }: reservationType = req.body;
    console.log(hotelId, checkIn, checkOut);

    //validate the input data here
    if (!hotelId || !checkIn || !checkOut) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "filed",
                    "Insufficiend input date",
                    400,
                ),
            );
    }

    // check if the checkin date is less than the curren date return
    const [day, month, year] = checkIn.split("-").map(Number);
    const checkInDate = new Date(year, month - 1, day); // Month is 0-based in JS Date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only date

    if (checkInDate < today) {
        return res
            .status(400)
            .json(
                new ApiError(false, {}, "filed", "INvalid checkin date", 400),
            );
    }

    try {
        // get the reservation duration
        const parseDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("-").map(Number);
            return new Date(year, month - 1, day); // Month is 0-based
        };
        const checkInDate = parseDate(checkIn);
        const checkOutDate = parseDate(checkOut);
        const diffTime = checkOutDate.getTime() - checkInDate.getTime();
        const reservationsDuration = diffTime / (1000 * 60 * 60 * 24);
        console.log(reservationsDuration);
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
                    .json(
                        new ApiError(
                            false,
                            {},
                            "Failed",
                            "No room's are available",
                            500,
                        ),
                    );
            }
            const totalAmount = 200 + reservationsDuration * isAvailable?.perNight!;

            //make the payment

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
                    .json(
                        new ApiError(
                            false,
                            {},
                            "Failed",
                            "Can't do the reservation all room are booked",
                            500,
                        ),
                    );
            }

            //get the current reservation status
            enum ReservationStatus {
                Pending = "pending",
                Active = "active",
                Canceled = "cancled",
            }
            let reservationStatus: any = ReservationStatus.Active;
            const currentDate = new Date();
            if (currentDate < checkInDate) {
                reservationStatus = ReservationStatus.Pending;
            } else if (
                currentDate >= checkInDate &&
                currentDate <= checkOutDate
            ) {
                reservationStatus = ReservationStatus.Active;
            } else {
                reservationStatus = ReservationStatus.Canceled;
            }

            // stpe 2 reserve the room
            const reserveRoom = await prisma.reservations.create({
                data: {
                    userId: req.user.id,
                    hotelId: hotelId,
                    roomId: nonReserveRoom.id,
                    checkIn: checkInDate,
                    checkOut: checkOutDate,
                    reservationsDuration: reservationsDuration,
                    amountPaid: totalAmount,
                    ReservationStatus: reservationStatus,
                    paymentStatus: "pending",
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
                    .json(
                        new ApiError(
                            false,
                            {},
                            "Failed",
                            "Can't do the reservation so internal issue",
                            500,
                        ),
                    );
            }

            //create the payment entry

            //devide the amoutn amont the platform and the host
            const hostAmount = Math.floor((totalAmount / 100) * 90);
            const platformAmount = Math.floor((totalAmount / 100) * 10);
            const paymentEntry = await prisma.payments.create({
                data: {
                    hotelId: hotelId,
                    userId: req.user.id,
                    amount: totalAmount,
                    hostAmount: hostAmount,
                    platformFee: platformAmount,
                    razorpay_payment_id: "null",
                    razorpay_order_id: "null",
                },
            });

            // Update the reservation with payment info
            const reservation2Res = await prisma.reservations.update({
                where: {
                    id: reserveRoom.id,
                },
                data: {
                    paymentId: paymentEntry.id,
                },
                include: {
                    payment: true,
                },
            });

            if (!paymentEntry) {
                return res
                    .status(400)
                    .json(
                        new ApiError(
                            false,
                            {},
                            "Failed",
                            "Can't make the payment entry",
                            400,
                        ),
                    );
            }

            return res.status(200).json(
                new ApiResponse(
                    true,
                    {
                        resevationId: reserveRoom.id,
                        roomId: nonReserveRoom.id,
                        hotelId: hotelId,
                        paymentId: paymentEntry.id,
                    },
                    "Successfull",
                    "Successfully reserved the room",
                    200,
                ),
            );
        });
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Can't do the reservation",
                    500,
                ),
            );
    }
};

//alogrithm
//1. get the necessary information
//2. check there is rooms are available or not
//4. find the non reserved room
//4. reserve the room with payment status unverifyed with payment
//5. After reserve the room update the hotel availabe rooms and isAvailable status

// data need to make this first phase reservation
{
    /*
    userid
    hotelid
    roomid
    chekin date
    checkout date
    amount


    payment dbhotelId
    userId
    amount
    paymentmethod
    status
    roodID
*/
}
