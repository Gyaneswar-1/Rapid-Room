import axios from "axios";
import { API } from "./API";

export const getHotels = async (page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${API}/hotel/get/?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
