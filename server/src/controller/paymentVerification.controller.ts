import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
import { reservtionStatus } from "@prisma/client";

export async function paymentVerification(
    req: Request | any,
    res: Response | any,
) {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    console.log(razorpay_order_id, razorpay_payment_id);
    
    const { hotelId, reservationId, paymentId, roomId } = req.query;

    //strictly get these infomation
    console.log(hotelId, reservationId, paymentId, roomId);
    console.log(req.user.id);

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !hotelId ||
        !reservationId ||
        !paymentId ||
        !roomId
    ) {
        //cancel the reservation
        // navigate to the error page
        return res.json({
            message: "failed in data validation",
        });
    }

    try {
        const trancation = await prisma.$transaction(async (prisma) => {
            const updateRoomStatus = await prisma.rooms.update({
                where: {
                    id: parseInt(roomId),
                    hotelId: parseInt(hotelId),
                },
                data: {
                    isReserved: true,
                },
            });

            // check in the hotel room is availabe or not
            const isAvailable = await prisma.hotels.findUnique({
                where: {
                    id: parseInt(hotelId),
                    isAllReserved: false,
                },
                select: {
                    numberOfEmptyRooms: true,
                },
            });

            // update the hotel availablity of rooms
            const updateHotel = await prisma.hotels.update({
                where: {
                    id: parseInt(hotelId),
                },
                data: {
                    numberOfEmptyRooms: isAvailable?.numberOfEmptyRooms! - 1,
                    isAllReserved:
                        isAvailable?.numberOfEmptyRooms === 1 ? true : false,
                },
            });

            //update the payment stats
            const paymentStatus = await prisma.payments.update({
                where: {
                    id: parseInt(paymentId),
                    userId: req.user.id,
                },
                data: {
                    razorpay_order_id: razorpay_order_id,
                    razorpay_payment_id: razorpay_payment_id,
                    status: "success",
                },
            });

            // update the reservtionStatus
            const reservation = await prisma.reservations.update({
                where: {
                    id: parseInt(reservationId),
                    userId: req.user.id,
                    hotelId: parseInt(hotelId),
                    roomId: parseInt(roomId),
                },
                data: {
                    paymentStatus: "success",
                },
            });
        });

        //navigate to the booking page
        //    return  res.redirect("http://localhost:5173/comeingsoon");
        return res.json({
            message: "sucessfull the payment",
        });
    } catch (error) {
        //cancel the reservation, navigate to the error page
        console.log(error);
        return res.json({
            message: "failed in catch",
        });
    }
}
