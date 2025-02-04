import axios from "axios";
import { API } from "./api";

export const getHotels = async (page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${API}/hotel/get/?page=${page}&limit=${limit}`
    );
    console.log("real data: ",response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
