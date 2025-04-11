import axios from "axios";
import API from "../api";

export default async function getSingleHotelInformation(hotelId: number) {
  try {
    const res = await axios.get(`${API}/hotel/get-hotel-info/${hotelId}`, {
      withCredentials: true,
    });
    
    return res.data;
  } catch (error) {
    console.error("Error fetching hotel info:", error);
    return { success: false };
  }
}
