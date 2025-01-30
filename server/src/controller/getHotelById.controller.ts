import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request,Response } from "express";

export const getHotelById = async (req:Request,res:Response|any) =>{
    try {
        
        const result = await prisma.hotels.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select:{
                id:true,
                hotelName:true,
                description:true,
                perNight:true,
                hasParking:true,
                hasPools:true,
                hasWifi:true,
                type:true,
                createdAt:true,
                rooms:{
                    select:{
                        id:true,
                        isReserved:true,
                        roomNumber:true,

                    }
                },
                address:{
                    select:{
                        street:true,
                        city:true,
                        state:true,
                        zipCode:true,
                        country:true
                    }
                }
                ,images:{
                    select:{
                            imageUrl:true,
                    }
                }
                
            }
        })

        return res.status(200).json(new ApiResponse(true,{result},"Success"))
    } catch (error) {
        return res.json()
    }
}