import axios from "axios";
import API from "./api";


export const getHotels = async (page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${API}/hotel/get/?page=${page}&limit=${limit}`
    );
   if(response.data.success === true){
    return{success: true, data: response.data.data.hotels}
   }else{
    return {success: false, data:[]}
   }
  } catch (error) {
    console.log(error);
    return {success: true, data:[]}
  }
};
