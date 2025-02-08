import { Request, Response } from "express";
export function paymentVerification(req:Request,res:Response){
    console.log(req.body);

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;



    //validate the payment here

    res.redirect("http://localhost:5173/home");
   


    res.status(200).json({
        success: true,
        data:{

        }
    })
}