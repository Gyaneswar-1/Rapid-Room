import prisma from "../db/db.config.js";

type paymentType = {
    hotelId: number;
    userId: number;
    amount: number;
    paymentMethod: string;
    status: string;
};

export const makeFakePayment = async ({
    hotelId,
    userId,
    amount,
    paymentMethod,
    status,
}: paymentType) => {
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
    
        if(!paymentRes){
            return {success: false}
        }
       return {success: true};
    } catch (error) {

        return {success: false};
        
    }
};
