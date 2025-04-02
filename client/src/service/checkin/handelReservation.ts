import API from "../api";
import axios from "axios";
export async function handelReservation(
  hotelId: number,
  chekcIn: string,
  checkOut: string
) {
  try {
    const response = await axios.post(`${API}/user/bookHotel`, {
      hotelId: hotelId,
      checkIn: chekcIn,
      checkOut: checkOut,
    },{
      withCredentials: true
    });
    console.log("here is the request reservation response", response);
    if (response.data.success === true) {
      return {
        success: true,
        data: response.data.data,
      };
    }

    return {
      success: false,
      data: {},
    };
  } catch (error) {
    console.log("failed in reservation");
  }
}
