import { transporter } from "../utils/NodemailerSetup.js";

type sendEamilType = {
  to: string;
  subject: string;
  text: string;
};

export const sendEmail = (obj: sendEamilType) => {
  const mailOptions = {
    from: process.env.GOOGLE_EMAIL!,
    to: obj.to,
    subject: obj.subject,
    text: obj.text,
  };

  return transporter.sendMail(mailOptions);
};
