import axios from "axios";
import API from "../api";


export const admin_getAllUsers = async(page:number | string,limit:number | string) =>{
    try {
        const response = await axios.get(
            `${API}/admin/users?page=${page}&limit=${limit}`
          );
          console.log(response)
         if(response.data.success === true){
          return{success: true, data: response.data.data}
         }else{
          return {success: false, data:[]}
         }
    } catch (error) {
        console.log(error);
        return {success: true, data:[]}
    }
} 