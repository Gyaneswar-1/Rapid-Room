import { transporter } from "../utils/NodemailerSetup.js";
export const sendEmail = async (obj) => {
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: obj.to,
        subject: obj.subject,
        text: obj.text,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
};
