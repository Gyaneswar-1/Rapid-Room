import prisma from "../db/db.config.js";

type paymentType = {
    hotelId: number;
    userId: number;
    amount: number;
    paymentMethod: string;
    status: boolean;
};

export const makeFakePayment = async ({
    hotelId,
    userId,
    amount,
    paymentMethod,
    status,
}: paymentType) => {
    const paymentRes = await prisma.payments.create({
        data: {
            hotelId: 123,
            userId: 456,
            amount: 150.0,
            paymentMethod: "card",
            status: "success",
            paymentDate: new Date(),
        },
    });

    if(paymentRes){
        return {success: true}
    }
    else{
        return {success: false}
    }
};
