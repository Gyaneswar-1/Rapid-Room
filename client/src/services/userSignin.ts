import axios from "axios";
import { API } from "./API";
import { SigninType } from "@bibek-samal/traveltrove";

export const SigninAPI = async (data: SigninType) => {
  try {
    console.log(data);
    await axios.post(`${API}/user/login`, data, {
      withCredentials: true,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
