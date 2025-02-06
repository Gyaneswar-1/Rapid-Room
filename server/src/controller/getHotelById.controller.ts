import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const getHotelById = async (req: Request, res: Response | any) => {
    try {
        const result = await prisma.hotels.findUnique({
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
                hasPools: true,
                hasWifi: true,
                hasTv: true,
                hasBalcony: true,
                hasKitchen: true,
                hasWorkSpace: true,
                hasWashingMachine: true,
                hasGarden: true,
                hasGrummingEqupments: true,
                type: true,
                createdAt: true,
                isAllReserved: true,
                numberOfEmptyRooms: true,
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

        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "Success"));
    } catch (error) {
        return res.json();
    }
};
