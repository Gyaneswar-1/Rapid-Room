import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "../../pages/Home";


const initialState:Result = {
  hotels: [],
  pagination: {
    currentPage: 0,
    pageSize: 0,
    totalHotels: 0,
    totalPages: 0
  }
};

export const HotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    getHotelsSuccess: (state, action: PayloadAction<any[]>) => {
      state.hotels = action.payload;
    },
 
  },
});

export default HotelSlice.reducer;
export const { getHotelsSuccess } =
  HotelSlice.actions;
