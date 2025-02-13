import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
import { upLoadOnCloudinary } from "../utils/cloudinaryImageHandel.js";
import { loggers } from "winston";

export const addNewHotel = async (req: Request | any, res: Response | any) => {
    console.log("controll reached")
    const {
        hotelName,
        description,
        numberOfRooms,
        perNight,
        roomType,
        hasParking,
        hasPools,
        hasWifi,
        hasTv,
        hasBalcony,
        hasKitchen,
        hasWorkSpace,
        hasWashingMachine,
        hasGarden,
        hasGrummingEqupments,
        images, //this images is an array or url coming direct from cliend ( for temporary testing purpose )
        type,
        state,
        street,
        city,
        zipcode,
        country,
    } = req.body;
    try {

        // task to do-> Debug the image upload functionality

        // const imageUrls = await Promise.all(
        //     req.files.map(async (file: Express.Multer.File) => {
        //         const imageUrl = await upLoadOnCloudinary(file.path);
        //         return imageUrl;
        //     }),
        // );

         console.log(        hotelName,
            description,
            numberOfRooms,
            perNight,
            roomType,
            hasParking,
            hasPools,
            hasWifi,
            hasTv,
            hasBalcony,
            hasKitchen,
            hasWorkSpace,
            hasWashingMachine,
            hasGarden,
            hasGrummingEqupments,
            images,
            type,
            state,
            street,
            city,
            zipcode,
            country,)
        const trancation = await prisma.$transaction(async (prisma) => {
            //create hotel
            const hotelRes = await prisma.hotels.create({
                data: {
                    host: { connect: { id: req.user.id } },
                    hotelName: hotelName,
                    description: description,
                    numberOfRooms: parseInt(numberOfRooms),
                    numberOfEmptyRooms: parseInt(numberOfRooms),
                    perNight: parseFloat(perNight),
                    roomType: roomType,
                    hasParking: Boolean(hasParking),
                    hasPools: Boolean(hasPools),
                    hasWifi: Boolean(hasWifi),
                    hasTv: Boolean(hasTv),
                    hasBalcony: Boolean(hasBalcony),
                    hasKitchen: Boolean(hasKitchen),
                    hasWorkSpace: Boolean(hasWorkSpace),
                    hasWashingMachine: Boolean(hasWashingMachine),
                    hasGarden: Boolean(hasGarden),
                    hasGrummingEqupments: Boolean(hasGrummingEqupments),
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
                    // images: {
                    //     createMany: {
                    //         data: images.map((url: string) => ({
                    //             imageUrl: url,
                    //         })),
                    //     },
                    // },
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
        console.log(error)
        res.status(501).json(new ApiError(false,{},"Failed","Failed at add hotel controller",501));
        return;
    } finally {
        prisma.$disconnect();
    }
};
