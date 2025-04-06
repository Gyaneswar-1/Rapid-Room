import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import { deleteOnCloudinary } from "../utils/cloudinaryImageHandel.js";

export const deleteUser = async (req: Request | any, res: Response | any) => {
    const { password } = req.body;

    try {
        // Using findFirst instead of findUnique since we're not sure which field is the unique identifier
        const user = await prisma.users.findFirst({
            where: {
                id: req.user.id,
            },
            select: {
                email: true,
                password: true,
            },
        });

        if (!user) {
            return res.status(404).json(new ApiError(false, {}, "User not found"));
        }

        const isValidPass = await bcrypt.compare(password, user?.password);

        if (isValidPass) {
            const result = await prisma.users.delete({
                where: {
                    id: req.user.id,
                },
                select: {
                    profileImage: true,
                },
            });
            
            const imageDelete = await deleteOnCloudinary(result.profileImage!);

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        true,
                        { result, imageDelete },
                        "successfully deleted user",
                    ),
                );
        }

        return res
            .status(401)
            .json(new ApiResponse(false, {}, "Invalid password", "failed!"));
    } catch (error: any) {
        console.error("Error deleting user:", error);
        return res
            .status(500)  // Changed from 200 to 500 which is more appropriate for errors
            .json(new ApiError(false, error, "error deleting user"));
    } finally {
        prisma.$disconnect();
    }
};
