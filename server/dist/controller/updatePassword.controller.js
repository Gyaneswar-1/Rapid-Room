import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { z } from "zod";
import prisma from "../db/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    otp: z.string().length(6, "Otp must be a 6 charecter"),
});
export const updatePassword = async (req, res) => {
    const data = req.body;
    const verifyRes = bodySchema.safeParse(data);
    console.log(verifyRes);
    if (!verifyRes.success) {
        return res
            .status(400)
            .json(new ApiError(false, {}, "Failed", "Password Reset failed", 400));
    }
    //chek the opt and passwod and email
    try {
        const emailRes = await prisma.users.findUnique({
            where: {
                email: data.email,
            },
            select: {
                otpToken: true,
            },
        });
        if (!emailRes) {
            return res
                .status(400)
                .json(new ApiError(false, {}, "Failed", "User don't Exist with this email", 400));
        }
        if (!emailRes?.otpToken || emailRes?.otpToken == "") {
            return res
                .status(400)
                .json(new ApiError(false, {}, "Failed", "Thre is no otp otken", 400));
        }
        //check the tokenData with the otp token
        const tokenData = jwt.verify(emailRes.otpToken, process.env.JWT_SECRET);
        if (data.email === tokenData.email && data.otp === tokenData.otp) {
            //hash the pass
            const hashedPassword = await bcrypt.hash(data.password, 10);
            //update the pass
            const updateUser = await prisma.users.update({
                where: {
                    email: data.email,
                },
                data: {
                    isEmailVerified: true,
                    password: hashedPassword,
                    otpToken: "",
                },
            });
            if (!updateUser) {
                return res
                    .status(400)
                    .json(new ApiError(false, {}, "Failed", "User don't Exist with this email", 400));
            }
            return res
                .status(200)
                .json(new ApiResponse(true, {}, "Success", "Success Fully update the Password", 200));
        }
        return res
            .status(400)
            .json(new ApiError(false, {}, "Failed", "Otp is not matched", 400));
    }
    catch (error) {
        console.log("here is the erro", error);
        return res
            .status(400)
            .json(new ApiError(false, { error: error }, "Failed", "Password update failed in catch", 400));
    }
};
//algorithem
// check otp and password email
// validate the email and otp
// if not verifyed then send error req,
// if the email and pass is verifyed then update the password
