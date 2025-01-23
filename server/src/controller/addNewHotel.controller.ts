import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";

export const addNewHotel = async (req: Request | any, res: Response | any) => {
    const {
        hotelName,
        description,
        numberOfRooms,
        perNight,
        hasParking,
        hasPools,
        hasWifi,
        images,
        type,
        state,
        street,
        city,
        zipcode,
        country,
    } = req.body;
    try {
        const imageUrls = await Promise.all(
            req.files.map(async (file: Express.Multer.File) => {
                const imageUrl = await upLoadOnCloudinary(file.path);
                return imageUrl;
            }),
        );

        const trancation = await prisma.$transaction(async (prisma) => {
            //create hotel
            const hotelRes = await prisma.hotels.create({
                data: {
                    owner: { connect: { id: req.user.id } },
                    hotelName: hotelName,
                    description: description,
                    numberOfRooms: parseInt(numberOfRooms),
                    numberOfEmptyRooms: parseInt(numberOfRooms),
                    perNight: parseFloat(perNight),
                    hasParking: Boolean(hasParking),
                    hasPools: Boolean(hasPools),
                    hasWifi: Boolean(hasWifi),
                    type: type,
                    address: {
                        create: {
                            state: state,
                            street: street,
                            city: city,
                            zipCode: zipcode,
                            country: country,
                        },
                    },
                    images: {
                        createMany: {
                            data: imageUrls.map((url: string) => ({
                                imageUrl: url,
                            })),
                        },
                    },
                },
            });

            //create bulkrooms
            const rooms = [];
            for (let i = 101; i < 101 + hotelRes.numberOfRooms; i++) {
                rooms.push({
                    roomNumber: i,
                    hotelId: hotelRes.id,
                });
            }

            //push these to db
            const roomsRes = await prisma.rooms.createMany({ data: rooms });

            if (!roomsRes || !hotelRes) {
                res.status(400).json(
                    new ApiError(
                        false,
                        {},
                        "failed",
                        "Unknown error occured , dontd tell me what to do",
                        400,
                    ),
                );
                return;
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        { hotelRes },
                        "data added successfully",
                        "Your hotel successfully listed to the website !",
                        200,
                    ),
                );
        });
    } catch (error) {
        res.status(501).json(new ApiError(false, { error }));
        return;
    } finally {
        prisma.$disconnect();
    }
};
