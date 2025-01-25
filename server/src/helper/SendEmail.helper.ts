import { transporter } from "../utils/NodemailerSetup.js";

type sendEamilType = {
    to: string;
    subject: string;
    text: string;
};
export const sendEmail = async (obj: sendEamilType) => {
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: obj.to,
        subject: obj.subject,
        text: obj.text,
    };

    try {
       await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
};
