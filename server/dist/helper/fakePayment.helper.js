import prisma from "../db/db.config.js";
export const makeFakePayment = async ({ hotelId, userId, amount, paymentMethod, status, }) => {
    try {
        const paymentRes = await prisma.payments.create({
            data: {
                hotelId: hotelId,
                userId: userId,
                amount: amount,
                paymentMethod: paymentMethod,
                status: status,
                paymentDate: new Date(),
            },
        });
        if (!paymentRes) {
            return { success: false };
        }
        return { success: true };
    }
    catch (error) {
        return { success: false };
    }
};
