import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  hotels: [
    {
      id: "",
      hotelName: "",
      perNight: "",
      address: { country: "", city: "" },
      reviews: [{ overalRating: "" }],
    },
  ],
};

export const HotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    getAllHotels: (state, action) => {
      state.hotels = action.payload;
    },
  },
});

export default HotelSlice.reducer;
export const { getAllHotels } = HotelSlice.actions;
