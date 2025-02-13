import { Request, Response } from "express";
import { instance } from "../app.js";

export const payment = async (req:Request | any,res:Response | any) => {

    const amount = req.body.amount;
    if(!amount){
       return res.status(400).json({
            success: false,
            msg: "paymet uncessfull",
            data:{
    
            },
        })
    }

    const  options = {
        amount: Number(amount * 100),  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        
      };


      const order = await  instance.orders.create(options);
      

    res.status(200).json({
        success: true,
        msg: "paymet sucessfull",
        data:{
            order: order
        },
    })
    
}
