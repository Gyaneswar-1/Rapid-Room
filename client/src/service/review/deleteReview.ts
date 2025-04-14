import axios from "axios";
import API from "../api";

type DeleteReviewData = {
  hid: number;
  rid: number;
};

export const deleteReview = async (deleteData: DeleteReviewData) => {
  try {
    const response = await axios.post(`${API}/review/delete`, deleteData, {
      withCredentials: true,
    });
    
    if (response.data.success === true) {
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to delete review",
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred while deleting review" };
  }
};
