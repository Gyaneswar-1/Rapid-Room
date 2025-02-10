import axios from "axios";
import API from "../api";

export default async function getSingleHotelInformation(hotelId: number) {
  try {
    const res = await axios.get(`${API}/hotel/get-hotel-info/${hotelId}`, {
      withCredentials: true,
    });
    if (res.data.success === true) {
      return { success: true, data: res.data.data };
    }

    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
