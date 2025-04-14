import axios from "axios";
import API from "../api";

export const getuserData = async () => {
  try {
    const response = await axios.get(`${API}/user/getinfo`, {
      withCredentials: true,
    });
    console.log("User data response:", response);
    
    if (response.data.success === true) {
      const userData = response.data.data;
      
      const address = userData.address || {};
      
      return {
        success: true,
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        profileImage: userData.profileImage,
        GovID: userData.GovID,
        isHost: userData.isHost,
        createdAt: userData.createdAt,
        hostExperience: userData.hostExperience,
        hostRating: userData.hostRating,
        hostResponseRate: userData.hostResponseRate,
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        country: address.country || "",
        latitude: address.latitude || null,
        longitude: address.longitude || null,
        status: userData.status,
        upiID: userData.upiID || "", 
      };
    }
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      data: null,
    };
  }
};
