import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const getUserInformation = async (req, res) => {
    try {
        const userInformation = await prisma.users.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                fullName: true,
                email: true,
                profileImage: true,
                isOwner: true,
                createdAt: true,
                address: {
                    select: {
                        street: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        country: true,
                    },
                },
            },
        });
        if (!userInformation) {
            return res
                .status(404)
                .json(new ApiError(false, {}, "Failed", "Can't get the data", 404));
        }
        return res
            .status(200)
            .json(new ApiResponse(true, userInformation, "Success", "Successfully get the user Information", 200));
    }
    catch (error) {
        return res.status(404).json(new ApiError(false, {
            errorStack: error.stack
                ? error.stack
                : "Something went wrong",
        }, "Failed", error.message ? error.message : "Can't get the userInformation", 404));
    }
};
