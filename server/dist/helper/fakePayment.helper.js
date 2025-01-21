import prisma from "../db/db.config.js";
export const makeFakePayment = async ({ hotelId, userId, amount, paymentMethod, status, }) => {
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
    if (paymentRes) {
        return { success: true };
    }
    else {
        return { success: false };
    }
};
