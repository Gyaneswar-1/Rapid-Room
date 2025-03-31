import prisma from "../db/db.config.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export const createAdmin = async (req, res) => {
    const { GovID, phoneNo, country, state, street, city, zipcode } = req.body;
    try {
        const isHost = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
        });
        if (isHost?.isHost === false) {
            const result = await prisma.users.update({
                where: {
                    id: req.user.id,
                },
                data: {
                    isHost: true,
                    GovID: GovID ? BigInt(GovID) : null,
                    phoneNumber: phoneNo ? BigInt(phoneNo) : null,
                    address: {
                        create: {
                            street: street,
                            state: state,
                            city: city,
                            zipCode: zipcode,
                            country: country,
                        },
                    },
                },
            });
            return res
                .status(200)
                .json(new ApiResponse(true, {}, "success to send the data", "success", 200));
        }
        else {
            return res
                .status(404)
                .json(new ApiResponse(false, {}, "host data cannot be changed", "User is already a host", 404));
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new ApiError(false, error, "failed to send ", "failed", 500));
    }
};
