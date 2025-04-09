import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
import prisma from "../db/db.config.js";

export const verifyEmail = async (req: Request | any, res: Response | any) => {
    const bodySchema = z.object({
        email: z.string().email(),
        otp: z.string().length(4, "Otp must be an 4 digit"),
    });

    interface tokenPayload {
        email: string;
        otp: string;
    }
    //vefify the body
    const validData = bodySchema.safeParse(req.body);
    if (!validData.success) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    { error: validData.error },
                    "failed",
                    "Invalid data comeing in body",
                    400,
                ),
            );
    }

    try {
        //get the data in body
        const { email, otp } = req.body;
        const dbToken = await prisma.users.findUnique({
            where: {
                email: email,
            },
            select: {
                otpToken: true,
            },
        });

        if (!dbToken) {
            return res
                .status(400)
                .json(
                    new ApiError(
                        false,
                        { error: "no user find with these credential" },
                        "failed",
                        "no user find with these credential",
                        400,
                    ),
                );
        }

        //verify the db token with the incomeing data
        if (!dbToken.otpToken) {
            return res
                .status(400)
                .json(
                    new ApiError(
                        false,
                        { error: "OTP token is missing for the user" },
                        "failed",
                        "OTP token is missing for the user",
                        400,
                    ),
                );
        }
        const tokenData = jwt.verify(
            dbToken.otpToken,
            process.env.JWT_SECRET!,
        ) as tokenPayload;
        if (email === tokenData.email && otp === tokenData.otp) {
            const updateUser = await prisma.users.update({
                where: {
                    email: email,
                },
                data: {
                    isEmailVerified: true,
                    otpToken: "",
                },
            });

            if (updateUser) {
                return res
                    .status(200)
                    .json(
                        new ApiResponse(
                            true,
                            {},
                            "Success",
                            "Successfully verify the email of the user",
                            200,
                        ),
                    );
            }
        }

        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {
                        msg: "token verification failed in emal varify controller",
                    },
                    "failed",
                    "Failed to verify the token in verifyemail controler",
                    400,
                ),
            );
    } catch (error) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    { error: error },
                    "failed",
                    "Failed to verify the token in the database in verify token controler",
                    400,
                ),
            );
    }
};

// get the otp and the emial in the body,
// compre it with the user db token with data (opt, email, userid)
// if verifyed then store user data email verifyed and delete the user token and send success to frontend
// if not send the error msg to the frontend
