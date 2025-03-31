import axios from "axios";
import API from "../api";

export const uploadImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(`${API}/image/upload`, formData, config);

    if (response.data.success === true) {
      return {
        success: true,
        imageUrl: response.data.data.imageUrl,
      };
    } else {
      console.error("Image upload failed:", response.data.message);
      return {
        success: false,
        imageUrl: "",
        error: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      imageUrl: "",
      error: "Failed to upload image. Please try again.",
    };
  }
};

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
