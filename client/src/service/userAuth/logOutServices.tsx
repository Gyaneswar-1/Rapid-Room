import axios from "axios";
import API from "../api";
export async function logOutServices() {
  //show the loader (done)
  //disable the click function (done)
  // clear the isloogedin (done)
  //cleare the cookie (done)
  // navigate the user to the welcome page (done)
  // show the card sign up
  await new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, 1000);
  });
  try {
    const res = await axios.get(`${API}/user/logout`, {
      withCredentials: true,
    });
    localStorage.removeItem("loggedin");
    return { success: true };
  } catch (error) {
    console.log(error, "error in logout service");
    return { success: false };
  }
}
