import axios from "axios";
import API from "../api";

interface ReviewData {
  hotelId: string;
  comment: string;
  rating: number;
  ratingDetails?: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    price: number;
    parking: number;
  };
}

export const addReview = async (reviewData: ReviewData) => {
  try {
    console.log("Review data to save", reviewData);
    
    const response = await axios.post(
      `${API}/reviews/add`,
      reviewData,
      {
        withCredentials: true
      }
    );
    if (response.data.success === true) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message || "Failed to add review" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while adding review" };
  }
};
