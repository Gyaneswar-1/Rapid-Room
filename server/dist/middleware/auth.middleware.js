import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import prisma from "../db/db.config.js";
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] ||
        req.cookies.token?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json(new ApiResponse(false, {}, "Access Denied", "No token Provided!"));
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res
                .status(401)
                .json(new ApiError(false, {}, "Failed", "User not authorized", 401));
        }
        //check the provided token's user exist on database or not
        const isExistUser = await prisma.users.findUnique({
            where: {
                id: verified.id,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                isOwner: true, //used in admin middleware
            },
        });
        if (!isExistUser) {
            return res
                .status(401)
                .json(new ApiError(false, {}, "Failed", "Provided token is not valid for the user", 401));
        }
        req.user = isExistUser;
        next();
    }
    catch (error) {
        return res
            .status(403)
            .json(new ApiResponse(false, {}, "Invalid Token", "Failed to authenticate token", 403));
    }
};
