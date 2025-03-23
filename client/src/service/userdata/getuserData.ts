import axios from "axios";
import API from "../api";

export const getuserData = async () => {
  try {
    const response = await axios.get(`${API}/user/getinfo`, {
      withCredentials: true,
    });
    if (response.data.success === true) {
      return {
        success: true,
        id: response.data.data.id,
        email: response.data.data.email,
        fullName: response.data.data.fullName,

        phoneNumber: response.data.data.phoneNumber,
        profileImage: response.data.data.profileImage,
        GovID: response.data.data.GovID,
        isHost: response.data.data.isHost,
        createdAt: response.data.data.createdAt,
        hostExperience: response.data.data.hostExperience,
        hostRating: response.data.data.hostRating,
        hostResponseRate: response.data.data.hostResponseRate,

        street: response.data.data.address.street,
        city: response.data.data.address.city,
        state: response.data.data.address.state,
        zipCode: response.data.data.address.zipCode,
        country: response.data.data.address.country,
        latitude: response.data.data.address.latitude,
        longitude: response.data.data.address.longitude,
      };
    }
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};
