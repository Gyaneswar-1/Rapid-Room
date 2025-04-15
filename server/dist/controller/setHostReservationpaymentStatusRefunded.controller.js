import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const setHostReservationPaymentStatusRefunded = async (req, res) => {
    try {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({
                success: false,
                message: "Payment ID is required",
            });
        }
        // Ensure payment ID is a number
        const paymentIdNum = parseInt(paymentId);
        if (isNaN(paymentIdNum)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment ID format",
            });
        }
        // Find the payment and associated reservation
        const payment = await prisma.payments.findUnique({
            where: { id: paymentIdNum },
            include: {
                reservation: true,
            },
        });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }
        if (!payment.reservation) {
            return res.status(404).json({
                success: false,
                message: "No reservation found for this payment",
            });
        }
        // Update payment status to refunded
        const updatedPayment = await prisma.payments.update({
            where: { id: paymentIdNum },
            data: {
                status: "refunded",
            },
        });
        // Update reservation payment status to refunded
        const updatedReservation = await prisma.reservations.update({
            where: { id: payment.reservation.id },
            data: {
                paymentStatus: "refunded",
            },
        });
        return res.status(200).json({
            success: true,
            message: "Payment status updated to refunded",
            data: {
                payment: updatedPayment,
                reservation: updatedReservation,
            },
        });
    }
    catch (error) {
        console.error("Error updating payment status:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update payment status",
        });
    }
};
export default setHostReservationPaymentStatusRefunded;
