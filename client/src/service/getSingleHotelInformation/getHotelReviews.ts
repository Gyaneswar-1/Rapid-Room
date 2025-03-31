import API from "../api";
import axios from "axios";

export const getHotelReviews = async (hotelId: number) => {
  try {
    const response = await axios.post(
      `${API}/review/get`,
      { hotelId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Hotel reviews response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotel reviews:", error);
    throw error;
  }
};
