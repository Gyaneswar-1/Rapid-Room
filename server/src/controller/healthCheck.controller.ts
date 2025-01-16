import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const healthCheck = async (req: any, res: any) => {
    try {
        return res
            .status(200)
            .json(new ApiResponse({}, "success", "successful send", 200));
    } catch (error) {
        return res
            .status(200)
            .json(new ApiError({}, "Error", "Error send", 200));
    }
};
