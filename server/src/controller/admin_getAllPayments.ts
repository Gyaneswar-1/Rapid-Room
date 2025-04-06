import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import prisma from "../db/db.config.js";
import { Request, Response } from "express";

export const admin_getAllPayments = async (
    req: Request | any,
    res: Response | any,
) => {
    try {
        // Get pagination parameters from query string
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const totalCount = await prisma.payments.count();
        
        const result = await prisma.payments.findMany({
            select: {
                id: true,
                hotel: {
                    select: {
                        hotelName: true,
                        host:{
                            select:{
                                fullName:true
                            }
                        }
                    },
                    
                },
                user:{
                    select:{
                        fullName:true
                    }
                },
                amount:true,
                platformFee:true,
                paymentDate:true,
                status:true
                
            },
            skip: skip,
            take: limit,
            orderBy: {
                paymentDate: 'desc'
            }
        });

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalCount / limit);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;

        return res
            .status(200)
            .json(
                new ApiResponse(
                    true,
                    {
                        payments: result,
                        pagination: {
                            total: totalCount,
                            page,
                            limit,
                            totalPages,
                            hasNext,
                            hasPrevious
                        }
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
