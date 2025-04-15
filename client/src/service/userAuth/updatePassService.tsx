import axios from "axios";
import API from "../api"
export const updatePass = async (email:string, otp: string,password:string) => {
    try {

        const updatePassRes = await axios.post(`${API}/user/update-pass`,{
            email:email,
            password: password,
            otp: otp
        })

        if(updatePassRes.data.success === true){
            return {success: true}
        }

        return{success:false}
        
    } catch (error) {
        console.log("Error in update service catch",error);
        return {success:false}
    }
}