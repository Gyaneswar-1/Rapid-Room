import axios from "axios";
import API from "../api";

type reviwData = {
  hotelId: number;
  reviewComment: string;
  cleanlinessRating: number;
  accuracyRating: number;
  checkInRating: number;
  communicationRating: number;
  locationRating: number;
  priceRating: number;
  parkingRating: number;
};

export const addReview = async (reviewData: reviwData) => {
  try {
    

    const response = await axios.post(`${API}/review/add`, reviewData, {
      withCredentials: true,
    });
    if (response.data.success === true) {
      return { success: true};
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to add review",
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while adding review" };
  }
};
