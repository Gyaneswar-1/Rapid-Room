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
    console.log("sent data",data);
  try {
    const result = await axios.post(`${API}/user/create-admin`, data, {
      withCredentials: true,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
