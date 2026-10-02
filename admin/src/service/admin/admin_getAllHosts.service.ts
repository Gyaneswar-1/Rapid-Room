import axios from "axios";
import API from "../api";

export const admin_getAllHosts = async (
  page: number | string,
  limit: string | number
) => {
  try {
    const response = await axios.get(
      `${API}/admin/host?page=${page}&limit=${limit}`
    );
    if (response.data.success === true) {
      return { success: true, data: response.data.data.users };
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};