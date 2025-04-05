import { createSlice } from "@reduxjs/toolkit";

interface BookingState {
  bookings: Array<{
    id: number;
    userId: number;
    hotelId: number;
    roomId: number;
    amountPaid: number;
    checkIn: string;
    checkOut: string;
    paymentStatus: string;
    ReservationStatus: string;
    user: {
      fullName: string;
    };
    hotel: {
      hotelName: string;
      images: Array<{ imageUrl: string }>;
      host: {
        id: number;
        fullName: string;
      };
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
        longitude: string;
        latitude: string;
      };
    };
    payment: {
      id: number;
    };
    room: {
      roomNumber: number;
    };
  }>;
}

const initialState: BookingState = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
  },
});

export const { setBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
