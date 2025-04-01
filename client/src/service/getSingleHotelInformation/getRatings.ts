import API from "../api";
import axios from "axios";

interface RatingResponse {
  success: boolean;
  data: {
    hotelId: number;
    totalReviews: number;
    averageRatings: {
      overall: number;
      cleanliness: number;
      accuracy: number;
      checkIn: number;
      communication: number;
      location: number;
      price: number;
      parking: number;
    };
  };
}

export const getRatings = async (hotelId: number) => {
  try {
    const response = await axios.post<RatingResponse>(
      `${API}/review/get-rating`,
      { hotelId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        data: {
          ...response.data.data.averageRatings,
          totalReviews: response.data.data.totalReviews,
        },
      };
    }

    throw new Error("Failed to fetch ratings");
  } catch (error) {
    console.error("Error fetching hotel ratings:", error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
