import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const addNewHotel = async (req, res) => {
    console.log("controll reached");
    const { hotelName, description, numberOfRooms, perNight, roomType, hasParking, hasPools, hasWifi, hasTv, hasBalcony, hasKitchen, hasWorkSpace, hasWashingMachine, hasGarden, hasGrummingEqupments, images, //this images is an array or url coming direct from cliend ( for temporary testing purpose )
    type, state, street, city, zipcode, country, longitude, latitude, } = req.body;
    try {
        // task to do-> Debug the image upload functionality
        // const imageUrls = await Promise.all(
        //     req.files.map(async (file: Express.Multer.File) => {
        //         const imageUrl = await upLoadOnCloudinary(file.path);
        //         return imageUrl;
        //     }),
        // );
        const trancation = await prisma.$transaction(async (prisma) => {
            const isExists = await prisma.hotels.findFirst({
                where: { hostId: req.user.id },
                include: { address: true, images: true },
            });
            //create hotel
            if (!isExists) {
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
                                longitude: longitude,
                                latitude: latitude,
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
                if (!hotelRes) {
                    return res.status(400).json(new ApiError(false, {}, "Failse", "Unable to creaet hote at create hotel controller", 400));
                }
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
                    res.status(400).json(new ApiError(false, {}, "failed", "Unknown error occured , dontd tell me what to do", 400));
                    return;
                }
                else {
                    return res
                        .status(200)
                        .json(new ApiResponse(true, { hotelRes }, "data created successfully", "Your hotel successfully  !", 200));
                }
            }
            else {
                const hotelUpdate = await prisma.hotels.update({
                    where: {
                        id: isExists.id,
                    },
                    data: {
                        host: { connect: { id: req.user.id } },
                        hotelName: hotelName !== undefined
                            ? hotelName
                            : isExists.hotelName,
                        description: description !== undefined
                            ? description
                            : isExists.description,
                        numberOfRooms: numberOfRooms !== undefined
                            ? parseInt(numberOfRooms)
                            : isExists.numberOfRooms,
                        numberOfEmptyRooms: numberOfRooms !== undefined
                            ? parseInt(numberOfRooms)
                            : isExists.numberOfEmptyRooms,
                        perNight: perNight !== undefined
                            ? parseFloat(perNight)
                            : isExists.perNight,
                        roomType: roomType !== undefined
                            ? roomType
                            : isExists.roomType,
                        hasParking: hasParking !== undefined
                            ? Boolean(hasParking)
                            : isExists.hasParking,
                        hasPools: hasPools !== undefined
                            ? Boolean(hasPools)
                            : isExists.hasPools,
                        hasWifi: hasWifi !== undefined
                            ? Boolean(hasWifi)
                            : isExists.hasWifi,
                        hasTv: hasTv !== undefined
                            ? Boolean(hasTv)
                            : isExists.hasTv,
                        hasBalcony: hasBalcony !== undefined
                            ? Boolean(hasBalcony)
                            : isExists.hasBalcony,
                        hasKitchen: hasKitchen !== undefined
                            ? Boolean(hasKitchen)
                            : isExists.hasKitchen,
                        hasWorkSpace: hasWorkSpace !== undefined
                            ? Boolean(hasWorkSpace)
                            : isExists.hasWorkSpace,
                        hasWashingMachine: hasWashingMachine !== undefined
                            ? Boolean(hasWashingMachine)
                            : isExists.hasWashingMachine,
                        hasGarden: hasGarden !== undefined
                            ? Boolean(hasGarden)
                            : isExists.hasGarden,
                        hasGrummingEqupments: hasGrummingEqupments !== undefined
                            ? Boolean(hasGrummingEqupments)
                            : isExists.hasGrummingEqupments,
                        type: type !== undefined ? type : isExists.type,
                        address: {
                            update: {
                                where: { id: isExists.address.id },
                                data: {
                                    state: state !== undefined ? state : isExists.address.state,
                                    street: street !== undefined ? street : isExists.address.street,
                                    city: city !== undefined ? city : isExists.address.city,
                                    zipCode: zipcode !== undefined ? zipcode : isExists.address.zipCode,
                                    country: country !== undefined ? country : isExists.address.country,
                                    longitude: longitude !== undefined ? parseFloat(longitude) : isExists.address.longitude,
                                    latitude: latitude !== undefined ? parseFloat(latitude) : isExists.address.latitude,
                                },
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
                return res
                    .status(200)
                    .json(new ApiResponse(true, { hotelUpdate }, "data updated successfully", "Your hotel updated !", 200));
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).json(new ApiError(false, {}, "Failed", "Failed at add hotel controller", 501));
        return;
    }
    finally {
        prisma.$disconnect();
    }
};
