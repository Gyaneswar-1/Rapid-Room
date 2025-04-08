import { Request, Response } from "express";
export const sendMail = async (req:Request | any, res:Response|any) =>{
    // get emil in body
    //generte the otp
    // generate the token using otp and email anduser id
    //store the token in the db users db
    // send the otp to the user
    return res.json({
        msg: "otp send successfully"
    })
} 