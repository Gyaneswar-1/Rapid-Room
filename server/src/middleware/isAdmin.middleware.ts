import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const isAdminMiddleware = async (
    req: Request | any,
    res: Response | any,
    next: NextFunction | any,
) => {
    if (!req.user.isOwner === true) {
        return res
            .status(401)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "user don't have the access to do the task",
                    401,
                ),
            );
    }
    next();
};
