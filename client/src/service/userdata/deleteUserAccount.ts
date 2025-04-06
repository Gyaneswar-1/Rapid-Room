import API from "../api";
import axios from "axios";

interface DeleteUserAccountResponse {
  success: boolean;
  data: any | null;
  error?: string;
}

export const deleteUserAccount = async (password: string): Promise<DeleteUserAccountResponse> => {
  try {
    const response = await axios.delete(`${API}/user/delete`, {
      data: { password }, // Send password in the request body
      withCredentials: true,
    });
    console.log(response);
    
    
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        data: null,
        error: response.data.statusText || "Account deletion failed",
      };
    }
  } catch (error: any) {
    console.error("Error deleting user account:", error);
    return {
      success: false,
      data: null,
      error:
        error.response?.data?.statusText ||
        error.message ||
        "Failed to delete user account",
    };
  }
};
