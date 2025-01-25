type sendEamilType = {
    to: string;
    subject: string;
    text: string;
};
export declare const sendEmail: (obj: sendEamilType) => Promise<{
    success: boolean;
}>;
export {};
