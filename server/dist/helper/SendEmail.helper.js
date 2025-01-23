import { transporter } from "../utils/NodemailerSetup.js";
export const sendEmail = (obj) => {
    const mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: obj.to,
        subject: obj.subject,
        text: obj.text,
    };
    return transporter.sendMail(mailOptions);
};
