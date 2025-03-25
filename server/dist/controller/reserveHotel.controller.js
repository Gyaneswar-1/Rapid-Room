import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
// functin to finc the the reservation duration
function getReservationDuratin(checkIn, checkOut) {
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day); // Month is 0-based
    };
    const checkInDate = parseDate(checkIn);
    const checkOutDate = parseDate(checkOut);
    // Calculate the difference in milliseconds
    const diffTime = checkOutDate.getTime() - checkInDate.getTime();
    // Convert milliseconds to days
    return diffTime / (1000 * 60 * 60 * 24);
}
export const reserveHotel = async (req, res) => {
    const { hotelId, checkIn, checkOut } = req.body;
    //validate the input data here
    if (!hotelId || !checkIn || !checkOut) {
        return res.status(400).json(new ApiError(false, {}, "filed", "Insufficiend input date", 400));
    }
    const reservationsDuration = getReservationDuratin(checkIn, checkOut);
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
                    checkIn: checkIn,
                    amountPaid: totalAmount,
                    ReservationStatus: "pending",
                    paymentStatus: "pending",
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
                    isReserved: false,
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
                Room number: 1
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
//4. find the non reserved room
//4. reserve the room with payment status unverifyed with payment
//5. After reserve the room update the hotel availabe rooms and isAvailable status
// data need to make this first phase reservation
{ /*
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
