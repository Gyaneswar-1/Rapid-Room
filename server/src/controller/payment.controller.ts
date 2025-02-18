import { Request, Response } from "express";
import { instance } from "../app.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const payment = async (req: Request | any, res: Response | any) => {
    const amount = req.body.amount;
    console.log("here is the amount", amount);
    
    if (!amount) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Can't find the amount payment conroller",
                    400,
                ),
            );
    }

    const options = {
        amount: Number(amount * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
    };

    const order = await instance.orders.create(options);

    return res.status(200).json(
        new ApiResponse(
            true,
            {
                order: order,
            },
            "Success",
            "Successfuly get the order",
        ),
    );
};
