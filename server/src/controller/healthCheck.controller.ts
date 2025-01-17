import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const healthCheck = async (req: any, res: any) => {
    try {
        return res
            .status(200)
            .json(new ApiResponse(true,{}, "success", "successful send", 200));
    } catch (error) {
        return res
            .status(200)
            .json(new ApiError(false,{}, "Error", "Error send", 200));
    }
};
