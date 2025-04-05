import axios from "axios";
import API from "../api";

export const getUserBookings = async () => {
  try {
    const response = await axios.get(`${API}/user/get-my-bookings`, {
      withCredentials: true,
    });

    if (!response) {
      return { success: false, data:[] };
    }

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export default getUserBookings;
