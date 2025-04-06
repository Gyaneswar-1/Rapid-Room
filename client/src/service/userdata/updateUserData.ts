import API from "../api";
import axios from "axios";

interface UpdateUserDataRequest {
  name?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  govId?: string;
  profileImage?: string;
}

interface UpdateUserDataResponse {
  success: boolean;
  data: any | null;
  error?: string;
}

export const updateUserData = async (
  formdata: UpdateUserDataRequest
): Promise<UpdateUserDataResponse> => {
  try {
    const response = await axios.put(`${API}/user/edit`, formdata, {
      withCredentials: true,
    });
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        data: null,
        error: response.data.statusText || "Update failed",
      };
    }
  } catch (error: any) {
    console.error("Error updating user data:", error);
    return {
      success: false,
      data: null,
      error:
        error.response?.data?.statusText ||
        error.message ||
        "Failed to update user data",
    };
  }
};
