import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
    req: Request | any,
    res: Response | any,
    next: NextFunction,
) => {
    const token: string =
        req.headers.authorization?.split(" ")[1] ||
        req.cookies.token?.split(" ")[1];
    console.log(token);

    if (!token) {
        return res
            .status(401)
            .json(
                new ApiResponse(
                    false,
                    {},
                    "Access Denied",
                    "No token Provided!",
                ),
            );
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = verified;
        next();
    } catch (error) {
        return res
            .status(403)
            .json(
                new ApiResponse(
                    false,
                    {},
                    "Invalid Token",
                    "Failed to authenticate token",
                    403,
                ),
            );
    }
};
