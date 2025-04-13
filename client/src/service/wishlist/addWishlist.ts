import axios from "axios";
import API from "../api";

export const addWishlist = async (hotelId: string|undefined) => {
  try {
    console.log("Hotel DI save",hotelId);
    
    const response = await axios.post(
      `${API}/wishlist/add`,
      { hotelId },
      {
        withCredentials: true
      }
    );
    if (response.data.success === true) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message || "Failed to add to wishlist" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while adding to wishlist" };
  }
};
