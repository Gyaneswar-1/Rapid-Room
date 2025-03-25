import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { sendEmail } from "../helper/SendEmail.helper.js";

export async function paymentVerification(req:Request,res:Response){
    
    
    // const { hotelId, amount, checkInDate, CheckOutDate } = req.query;

    

     res.status(200).json({

        success: false,
    }
    )
    return
    

//    return  res.redirect("http://localhost:5173/comeingsoon");
   


    
}

// create the payment entry
// user id
// hotel id
// reservation id
// amount

//create the reservation entry
// user id
// hotel id
// check in date
// check out date
// amount paid
