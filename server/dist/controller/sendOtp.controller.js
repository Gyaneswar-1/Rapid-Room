import { transporter } from "../utils/NodemailerSetup.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
export async function sendOtp(req, res) {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json(new ApiError(false, {}, "Failed", "Otp sending filed", 400));
    }
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: email,
        subject: "Otp verification for reservation",
        text: `${otp}`,
    };
    try {
        const otpResponse = await transporter.sendMail(mailOptions);
        if (otpResponse) {
            return res.status(200).json(new ApiResponse(true, { otp: otp }, "Success", "successfully send the otp", 200));
        }
        new ApiError(false, {}, "Failed", "Otp sending filed", 400);
    }
    catch (error) {
        new ApiError(false, { msg: error?.message }, "Failed", "Otp sending filed", 400);
    }
}
