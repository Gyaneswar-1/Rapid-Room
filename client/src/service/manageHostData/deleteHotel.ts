import axios from "axios";
import API from "../api";

export const deleteHotel = async (hotelId: number) => {
  try {
    const response = await axios.delete(`${API}/hotel/delete`, {
      data: { hid: hotelId }
    });

    if (response.data.success) {
      return {
        success: true,
        message: "Hotel deleted successfully",
        data: response.data.data
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to delete hotel"
      };
    }
  } catch (error: any) {
    console.error("Error deleting hotel:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error deleting hotel. Please try again.",
      error: error.response?.data || error.message
    };
  }
};
