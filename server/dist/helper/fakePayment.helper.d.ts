type paymentType = {
    hotelId: number;
    userId: number;
    amount: number;
    paymentMethod: string;
    status: string;
};
export declare const makeFakePayment: ({ hotelId, userId, amount, paymentMethod, status, }: paymentType) => Promise<{
    success: boolean;
}>;
export {};
