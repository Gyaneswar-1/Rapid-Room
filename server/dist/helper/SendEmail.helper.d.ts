type sendEamilType = {
    to: string;
    subject: string;
    text: string;
};
export declare const sendEmail: (obj: sendEamilType) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export {};
