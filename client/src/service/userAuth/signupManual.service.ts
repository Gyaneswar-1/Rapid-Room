import { signupTypeFrontend } from "@bibek-samal/traveltrove";
import axios from "axios";
import API from "../api";


export default async function signupManual(data: signupTypeFrontend){
    try {

        const res = await axios.post(`${API}/user/signup`,data,{
            withCredentials:true
        });

        if(res.data.success === true){
            return {success: true, message: res.data.message?res.data.message: "User successfully Register", email: res.data.data.email}
        }

        return{success:false, message:res.data.message?res.data.message: "User registration fail"}
        
    } catch (error) {
        
        return{success: false, message:"user registration fail"};
    }
}
