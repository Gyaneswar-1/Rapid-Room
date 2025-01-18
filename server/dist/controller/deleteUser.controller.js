import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
export const deleteUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                password: true,
            },
        });
        if (!user) {
            return res.status(500).json(new ApiError(false));
        }
        const isValidPass = await bcrypt.compare(password, user?.password);
        if (user.email === email && isValidPass) {
            const result = await prisma.users.delete({
                where: {
                    email: email,
                },
            });
            return res
                .status(200)
                .json(new ApiResponse(true, result, "successfully deleted user"));
        }
        return res
            .status(401)
            .json(new ApiResponse(false, {}, "error in password", 'failed!'));
    }
    catch (error) {
        return res
            .status(200)
            .json(new ApiError(false, error, "error deleting user"));
    }
    finally {
        prisma.$disconnect();
    }
};
