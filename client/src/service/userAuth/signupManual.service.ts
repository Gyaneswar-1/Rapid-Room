import { signupTypeFrontend } from "@bibek-samal/traveltrove";
import axios from "axios";
import API from "../api";


export default async function signupManual(data: signupTypeFrontend){
    try {

        const res = await axios.post(`${API}/user/signup`,data,{
            withCredentials:true
        });

        if (res.data.success === true) {
            return {
                success: true,
                message: res.data.message || "User successfully registered",
                email: res.data.data.email,
            };
        }

        return {
            success: false,
            message: res.data.message || "User registration failed",
        };
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "User registration failed";
        return { success: false, message };
    }
}
