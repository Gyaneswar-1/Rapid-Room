import { Request, Response } from "express"
export function getRazorpayKey(req:Request,res:Response){
    res.status(200).json({
        success: true,
        data:{
            key: process.env.RAZORPAY_KEY!,
        }
    })
}