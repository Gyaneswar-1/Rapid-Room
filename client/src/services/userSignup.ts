import axios from "axios";
import { API } from "./API";
import { signupTypeFrontend } from "@bibek-samal/traveltrove";

export const SignupAPI = async (data: signupTypeFrontend) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("conformPassword", data.conformPassword);

  if (data.profileImage) {
    formData.append("profileImage", data.profileImage[0] || null);
  }
  try {
    await axios.post(`${API}/user/signup`, formData, {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
  return false;
};
