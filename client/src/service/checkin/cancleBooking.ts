import axios from "axios";
import API from "../api";

interface CancelBookingParams {
  hotelId: number;
  roomId: number;
  paymentId: number;
  reservationId: number;
}

export const cancelBooking = async ({
  hotelId,
  roomId,
  paymentId,
  reservationId,
}: CancelBookingParams): Promise<{ success: boolean }> => {
  try {
    await axios.delete(`${API}/user/cancel-reservation`, {
      data: {
        hotelId,
        roomId,
        paymentId,
        reservationId,
      },
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
