import axios from "axios";
import { API } from "./API";
import { signupTypeFrontend } from "@bibek-samal/traveltrove";

export const SignupAPI = async (data: signupTypeFrontend) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("conformPassword", data.conformPassword);
  if(data.ProfilePhoto){
    formData.append("profileImage",data.ProfilePhoto);
  }
  try {
    console.log(data);
    await axios.post(`${API}/user/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
  return false
};
