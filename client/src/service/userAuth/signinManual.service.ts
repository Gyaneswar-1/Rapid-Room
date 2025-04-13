import { SigninType } from "@bibek-samal/traveltrove";
import axios from "axios";
import API from "../api";

export default async function signinManual(data:SigninType) {
    try {

        const res = await axios.post(`${API}/user/login`,data,{
            withCredentials:true
        });

        if(res.data.success === true){
            console.log("signin res",res.data.data)
            return {success: true, message: res.data.message?res.data.message: "User successfully logind in", isEmailVerifyed: res.data.data.isEmailVerifyed,
            email: res.data.data.email
            }
        }

        return{success:false, message:res.data.message?res.data.message: "User logedin fail"}
        
    } catch (error) {
        
        return{success: false, message:"user logidin fail"};
    }
}