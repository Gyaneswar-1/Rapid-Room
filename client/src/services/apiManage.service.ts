import { jwtDecode } from "jwt-decode";

export const getUserID = async () => {
  const token = await getToken();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getToken = () => {
  return document.cookie.split(" ")[1];
};
