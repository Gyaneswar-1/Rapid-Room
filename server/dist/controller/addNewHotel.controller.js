import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const addNewHotel = async (req, res) => {
    const { id, hotelName, description, numberOfRooms, perNight, hasParking, hasPools, hasWifi, images, type, state, street, city, zipcode, country, } = req.body;
    try {
        const isAllowed = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                isOwner: true,
            },
        });
        if (isAllowed?.isOwner === false) {
            return res
                .status(501)
                .json(new ApiResponse(false, {}, "no access", "you have no access to add hotels !", 501));
        }
        const result = await prisma.hotels.create({
            data: {
                owner: { connect: { id: id } },
                hotelName: hotelName,
                description: description,
                numberOfRooms: numberOfRooms,
                perNight: perNight,
                hasParking: hasParking,
                hasPools: hasPools,
                hasWifi: hasWifi,
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
                        data: images.map((imageUrl) => ({ imageUrl })),
                    },
                },
            },
        });
        return res
            .status(200)
            .json(new ApiResponse(true, { result }, "data added successfully", "Your hotel successfully listed to the website !", 200));
    }
    catch (error) {
        res.status(501).json(new ApiError(false, { error }));
    }
    finally {
        prisma.$disconnect();
    }
};
