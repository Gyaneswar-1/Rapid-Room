import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const admin_paymentDashboard = async (
    // req: Request | any,
    res: Response | any,
) => {
    try {
        const TotalTransactionsCount = await prisma.payments.count();
        const TotalTransactions = TotalTransactionsCount || 0;

        const TotalRevenueResult = await prisma.payments.aggregate({
            _sum: {
                amount: true,
            },
        });
        const TotalRevenue = TotalRevenueResult._sum.amount || 0;

        const PlatformFeesResult = await prisma.payments.aggregate({
            _sum: {
                platformFee: true,
            },
        });
        const PlatformFees = PlatformFeesResult._sum.platformFee || 0;

        const AverageCommission = 12.4;

        // Get the number of payments grouped by hotel type
        const PaymentsByHotelType = await prisma.payments.findMany({
            include: {
                hotel: {
                    select: {
                        type: true,
                    },
                },
            },
        });

        // Transform the data to group by hotel type
        const PaymentsByType = PaymentsByHotelType.reduce<Record<string, number>>((acc, payment) => {
            const hotelType = payment.hotel?.type || "UNKNOWN";
            acc[hotelType] = (acc[hotelType] || 0) + 1;
            return acc;
        }, {});

        return res.status(200).json(
            new ApiResponse(
                true,
                {
                    topCards: {
                        TotalRevenue,
                        PlatformFees,
                        TotalTransactions,
                        AverageCommission,
                    },
                    pieChart: PaymentsByType,
                },
                "Payment dashboard statistics retrieved successfully",
            ),
        );
    } catch (error) {
        console.error("Error in admin_paymentDashboard:", error);
        return res
            .status(500)
            .json(
                new ApiError(
                    true,
                    {},
                    "Something went wrong while fetching payment dashboard",
                ),
            );
    }
};
