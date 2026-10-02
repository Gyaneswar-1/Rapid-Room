import jwt from "jsonwebtoken";
import { z } from "zod";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendEmail } from "../helper/SendEmail.helper.js";
import prisma from "../db/db.config.js";
export const sendMail = async (req, res) => {
    const bodySchema = z.object({
        email: z.string().email(),
    });
    const schemaVerification = bodySchema.safeParse(req.body);
    if (!schemaVerification.success) {
        return res
            .status(400)
            .json(new ApiError(false, {}, "Failed", "Invalid data check the body", 400));
    }
    try {
        const { email } = req.body;
        const user = await prisma.users.findUnique({
            where: { email: email },
        });
        if (!user) {
            return res.status(404).json(new ApiError(false, {}, "Failed", "User not found with this email", 404));
        }
        // generate the otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // Log OTP to terminal
        console.log(`\n======================================================`);
        console.log(`🔑 [RapidRoom OTP] Verification OTP for ${email}: ${otp}`);
        console.log(`======================================================\n`);
        // generate the jwt token for otp security
        const otpToken = jwt.sign({
            email: email,
            otp: otp,
        }, process.env.JWT_SECRET);
        // Store the otpToken in the database so OTP is valid
        await prisma.users.update({
            where: {
                email: email,
            },
            data: {
                otpToken: otpToken,
            },
        });
        // Send the otp to the user email
        let emailSent = false;
        try {
            await sendEmail({
                to: email,
                subject: "Welcome to RapidRoom - Your Verification OTP",
                text: `Welcome to RapidRoom!\n\nYour verification OTP is: ${otp}\n\nPlease enter this OTP to complete your registration.\n\nThank you!`,
            });
            emailSent = true;
            console.log(`📧 [RapidRoom OTP] OTP email sent successfully to ${email}`);
        }
        catch (emailErr) {
            console.error(`⚠️ [RapidRoom OTP] Failed to send email via SMTP to ${email}:`, emailErr?.message || emailErr);
        }
        return res.status(200).json(new ApiResponse(true, { emailSent }, "Success", emailSent
            ? "Successfully sent the OTP to your email and printed to terminal"
            : "OTP generated and printed to terminal (email delivery failed)", 200));
    }
    catch (error) {
        console.error("Error in sendOtp controller:", error);
        return res
            .status(400)
            .json(new ApiError(false, { error: error?.message || error }, "Failed", "Failed to process OTP in send otp controller", 400));
    }
};
// get emil in body
//generte the otp
// generate the token using otp and email anduser id
//store the token in the db users db
// send the otp to the user
