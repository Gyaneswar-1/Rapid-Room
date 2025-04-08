import {Request, Response} from "express";
export const verifyEmail = async(req: Request | any,res: Response | any) => {
    // get the otp and the emial in the body,
    // compre it with the user db token with data (opt, email, userid)
    // if verifyed then store user data email verifyed and delete the user token and send success to frontend
    // if not send the error msg to the frontend
    return res.json({
        msg: "email verifyed successfully by bibek and gyana"
    })
}