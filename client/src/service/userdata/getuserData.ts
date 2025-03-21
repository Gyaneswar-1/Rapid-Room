import axios from "axios";
import API from "../api";

export const getuserData = async () => {
  try {
    const response = await axios.get(`${API}/user/getinfo`, {
      withCredentials: true,
    });
    console.log("response datatta",response);
    if (response.data.success === true) {
      // return{success: true, data: response}
    } else {
      return { success: false, data: [] };
    }
  } catch (error) {
    console.log(error);
    return { success: true, data: [] };
  }
};
