import axios from "axios";
import API from "../api";

export const admin_getAnalysis = async() => {
 try {
    const response = await axios.get(`${API}/admin/stats/dashboard`);
    
    if (response.data.success === true) {
        return { 
            success: true, 
            data: response.data.data 
        };
    } else {
        return { 
            success: false, 
            data: null 
        };
    }
 } catch (error) {
    console.log(error);
    return { 
        success: false, 
        data: null,
        error: error instanceof Error ? error.message : "An error occurred while fetching dashboard statistics" 
    };
 }
}