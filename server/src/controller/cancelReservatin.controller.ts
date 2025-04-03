import { Request, Response } from "express";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
export const cancleReservation = async (
    req: Request | any,
    res: Response | any,
) => {
    const zodSchemaForCancelation = z.object({
        hotelId: z.number(),
        roomId: z.number(),
        paymentId: z.number(),
        reservationId: z.number(),
    });
    const { hotelId, roomId, paymentId, reservationId } = req.body;
    //validate the inputdata
    const validData = zodSchemaForCancelation.safeParse(req.body);
    if (!validData.success) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Reservation cancelation failed due to insufficent or un formated data",
                ),
            );
    }

    try {
        const userId = req.user.id;
        const prismaTransaction = await prisma.$transaction(async ()=>{
            //find the payment and update it status
            const paymentupdate = await prisma.payments.update({
                where:{
                    userId: userId,
                    id: paymentId
                },
                data:{
                    status: "refund"
                }
            })

            //find the reservationa and update its status
            const reservationStatus = await prisma.reservations.update({
                where:{
                    userId: userId,
                    id: reservationId
                },
                data:{
                    ReservationStatus: "cancled",
                    paymentStatus: "refund"
                }
            })


            //update the room reservation status
            const reservatinStatus = await prisma.rooms.update({
                where:{
                    hotelId: hotelId,
                    id: roomId
                },
                data:{
                    isReserved: false
                }
            })

            //update the room avability of the room in the hotel
            const hotelresponse = await prisma.hotels.update({
                where:{
                    id: hotelId,
                },
                data:{
                    isAllReserved: false,
                    numberOfEmptyRooms:{
                        increment: 1
                    }
                }
            })
            
        })

        return res.status(200).json(
            new ApiResponse(
                true,
                {},
                "success",
                "Sucessfull cancel the resevation",
                200
            )
        )

    } catch (error) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Reservation cancelation failed due to insufficent or un formated data",
                ),
            );
    }
};

//algorith to cancel the reservation
//goto hotel increase the room avalbility (done)
//goto to the room and update the reservation status (done)
//goto the payment and set its status for refund (done)
//got to the resevation and make it status to refund (done)

//datad need for this operaton
// hotelId
// roomId
// payment Id
// reservation Id
