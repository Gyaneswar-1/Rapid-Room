import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request, Response } from "express";

export const healthCheck = async (req: Request, res: Response | any) => {
    try {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    true,
                    {name:"RapidRoom",developers:["gyaneswar","bibek"],description:"hotel booking"},
                    "Success",
                    "Health check success",
                    400,
                ),
            );
    } catch (error) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "can't get the hotel information",
                    400,
                ),
            );
    }
};
