import axios from "axios";
import API from "../api";

export const getWishlists = async () => {
  try {
    const response = await axios.get(`${API}/wishlist/get`,{
      withCredentials:true
    });
    
    if (response.data.success === true) {
      return { success: true, data: response.data.data.result };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};
