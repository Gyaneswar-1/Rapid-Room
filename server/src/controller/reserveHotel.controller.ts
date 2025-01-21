import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { makeFakePayment } from "../helper/fakePayment.helper.js";

export const reserveHotel = async (req: Request | any, res: Response | any) => {
    //check the hotel has rooms or not
    //make payment for reservation
    // create a room for reservation
    //increase the hotel room hasful and number of empty rooms
    //ad the room, payment and hotel in thereservation
    res.send("hotel booked succesfully");
};
