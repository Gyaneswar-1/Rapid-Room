type paymentType = {
    hotelId: number;
    userId: number;
    amount: number;
    paymentMethod: string;
    status: "APPROVED" | "PENDING" | "REJECTED";
};
export declare const makeFakePayment: ({ hotelId, userId, amount, paymentMethod, status, }: paymentType) => Promise<{
    success: boolean;
}>;
export {};
