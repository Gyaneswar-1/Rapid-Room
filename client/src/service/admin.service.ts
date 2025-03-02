import axios from "axios";
import API from "./api";

export const applyAdmin = async (data: {
  phoneNumber: string;
  govID: number;
  country: string;
  state: string;
  city: string;
  zip: number;
  street: string;
}) => {
  try {
    const result = await axios.post(`${API}/user/create-admin`, data, {
      withCredentials: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
