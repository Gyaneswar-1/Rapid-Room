import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelState {
  hotels: any;
  error: any;
}

const initialState: HotelState = {
  hotels: [],
  error: null,
};

export const HotelSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
      getHotelsSuccess: (state, action: PayloadAction<any[]>) => {
        state.hotels = action.payload;
      },
      getHotelsFailure: (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      },
    },
  });

export default HotelSlice.reducer;
export const { getHotelsSuccess, getHotelsFailure } = HotelSlice.actions;

