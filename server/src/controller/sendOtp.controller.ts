import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
import prisma from "../db/db.config.js";

export const sendMail = async (req: Request | any, res: Response | any) => {
    const bodySchema = z.object({
        email: z.string().email(),
    });

    const schemaVerification = bodySchema.safeParse(req.body);
    if (!schemaVerification.success) {
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Invalid data check the body",
                    400,
                ),
            );
    }

    try {
        
        const { email } = req.body;
        // generate the otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(process.env.JWTS)
        //generate the jwt token for otp sequrity
        const otpToken = await jwt.sign(
            {
                email: email,
                otp: otp,
            },
            process.env.JWT_SECRET!,
        );
    
        // send the opt to the user email
        const emailRes = await sendEmail({to:email, subject:"Welcome to RapidRoom Here is you otp", text:otp});
        if(emailRes){

            const dbRes = await prisma.users.update({
                where: {
                    email: email
                },
                data:{
                    otpToken:otpToken
                }
            })

            if(dbRes){
                return res.status(200).json(
                    new ApiResponse(
                        true,
                        {},
                        "Success",
                        "Successfully send the opt to ther client",
                        200
                    )
                )
            }

            
        }

        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {},
                    "Failed",
                    "Failed to send theo otp",
                    400,
                ),
            );

        //store the otp in the user data base
    } catch (error) {
        console.log(error)
        return res
            .status(400)
            .json(
                new ApiError(
                    false,
                    {error: error},
                    "Failed",
                    "Failed to send theo otp in send otp controller",
                    400,
                ),
            );
    }
    


};


// get emil in body
//generte the otp
// generate the token using otp and email anduser id
//store the token in the db users db
// send the otp to the user
