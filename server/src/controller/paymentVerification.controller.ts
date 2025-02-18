import { Request, Response } from "express";
export function paymentVerification(req:Request,res:Response){
    

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;



    // here store the data in the data base like payment, checkin information

    console.log("payment verification connroll reached");
    console.log(req.query)

   return  res.redirect("http://localhost:5173/home");
   


    
}