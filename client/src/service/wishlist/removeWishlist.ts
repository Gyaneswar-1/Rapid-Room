import axios from "axios";
import API from "../api";

export const removeWishlist = async (hotelId: string|undefined) => {
  try {
    const response = await axios.delete(
      `${API}/wishlist/remove`,
      {
        data: { hotelId },
        withCredentials: true
      }
    );
    
    if (response.data.success === true) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message || "Failed to remove from wishlist" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while removing from wishlist" };
  }
};
