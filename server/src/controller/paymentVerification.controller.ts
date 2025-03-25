import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { sendEmail } from "../helper/SendEmail.helper.js";

export async function paymentVerification(req:Request,res:Response){
    
    // //update the room status
    // const updateRoomStatus = await prisma.rooms.update({
    //     where: {
    //         id: nonReserveRoom.id,
    //     },
    //     data: {
    //         isReserved: false,
    //     },
    // });

    // if (!updateRoomStatus) {
    //     return res
    //         .status(400)
    //         .json(
    //             new ApiError(
    //                 false,
    //                 {},
    //                 "Failed",
    //                 "Cant update the room Status",
    //                 400,
    //             ),
    //         );
    // }

    // //update the hotel availablity of rooms
    // const updateHotel = await prisma.hotels.update({
    //     where: {
    //         id: hotelId,
    //     },
    //     data: {
    //         numberOfEmptyRooms: isAvailable?.numberOfEmptyRooms! - 1,
    //         isAllReserved:
    //             isAvailable?.numberOfEmptyRooms === 1 ? true : false,
    //     },
    // });

    // if (!updateHotel) {
    //     return res
    //         .status(500)
    //         .json(
    //             new ApiError(
    //                 false,
    //                 {},
    //                 "Failed",
    //                 "Can't do the reservation some internal issue",
    //                 500,
    //             ),
    //         );
    // }

    // //send the succes mail to the user
    // const mailRes = await sendEmail({
    //     to: req.user.email,
    //     subject: "Hotel booked successfully",
    //     text: `
    //     Hotel: ${isAvailable.hotelName}
    //     Room number: 1
    //     Checkin date: ${`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}
    //     Pernight cost: ${isAvailable.perNight}
    //     Total cost: ${totalAmount}

    //     `,
    // });
   

//    return  res.redirect("http://localhost:5173/comeingsoon");
   


    
}


