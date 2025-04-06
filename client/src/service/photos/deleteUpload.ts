import axios from "axios";
import API from "../api";

export const deleteImage = async (imageUrl: string) => {
  try {
    const response = await axios.delete(`${API}/image/delete`, {
      data: { imageUrl },
    });

    if (response.data.success === true) {
      return {
        success: true,
        message: "Image deleted successfully",
      };
    } else {
      console.error("Image deletion failed:", response.data.message);
      return {
        success: false,
        error: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error: "Failed to delete image. Please try again.",
    };
  }
};
