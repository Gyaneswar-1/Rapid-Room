import axios from "axios";
import API from "../api";

export const setReservationStatusRefunded = async (paymentId: number) => {
  try {
    console.log("Sending refund request for payment ID:", paymentId);
    
    // Update the endpoint to match the route in HostDashboard.routes.ts
    const response = await axios.post(
      `${API}/host/reservations-refunded`,
      { paymentId },
      {
        withCredentials: true
      }
    );
    
    console.log("Refund response:", response);
    
    if (response.data.success === true) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update refund status",
        data: null
      };
    }
  } catch (error: any) {
    console.log("Refund error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update refund status",
      error: error
    };
  }
};
