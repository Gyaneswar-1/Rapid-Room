import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const getHotelById = async (req: Request | any, res: Response | any) => {
    console.log("controll reached")
    try {
        const hotelResponse = await prisma.hotels.findUnique({
            where: {
                id: parseInt(req.params.hotelId),
            },
            select: {
                id: true,
                hotelName: true,
                description: true,
                roomType: true,
                perNight: true,
                hasParking: true,
                hasPool: true,
                hasWifi: true,
                hasTv: true,
                hasBalcony: true,
                hasKitchen: true,
                hasWorkSpace: true,
                hasWashingMachine: true,
                hasGarden: true,
                type: true,
                createdAt: true,
                isAllReserved: true,
                numberOfEmptyRooms: true,
                overalRating:true,
                totalReviews:true,
                guestAllowed: true,
                WishList:{
                    where:{
                        userId:req.user.id
                    },
                    select: {
                        id: true,
                        userId: true
                    }
                },
                host: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        hostExperience: true,
                        hostResponseRate: true,
                        hostRating: true,
                        profileImage: true,
                        createdAt: true,
                    },
                },
                reviews: {
                    select: {
                        userId: true,
                        reviewComment: true,
                        overallRating: true,
                        cleanlinessRating: true,
                        accuracyRating: true,
                        checkInRating: true,
                        communicationRating: true,
                        locationRating: true,
                        priceRating: true,
                        parkingRating: true,

                        user:{
                            select:{
                                fullName: true,
                                profileImage: true,
                                address:{
                                    select:{
                                        country: true,
                                        state: true,
                                    }
                                }
                            }
                        }
                    },
                },
                address: {
                    select: {
                        street: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        country: true,
                        longitude: true,
                        latitude: true,
                    },
                },
                images: {
                    select: {
                        imageUrl: true,
                    },
                },
            },
        });
        
        if(hotelResponse){
            // Add isWishlisted property to indicate if hotel is in user's wishlist
            const responseWithWishlistStatus = {
                ...hotelResponse,
                isWishlisted: hotelResponse.WishList.length > 0
            };

            return res
                .status(200)
                .json(new ApiResponse(true, responseWithWishlistStatus, "Success", "Get the hotel information", 200));
        }else{
            return res.status(400).json(
                new ApiError(false,{},"Failed","can't get the hotel information",400)
            )
        }
    } catch (error) {
        return res.status(400).json(
            new ApiError(false,{},"Failed","can't get the hotel information",400)
        )
        
    }
};
