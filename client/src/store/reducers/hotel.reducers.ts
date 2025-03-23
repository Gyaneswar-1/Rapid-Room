import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  hasHotelsArray:false,
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
    setHaveHotels:(state,action)=>{
      state.hasHotelsArray = action.payload;
    }
  },
});

export default HotelSlice.reducer;
export const { getAllHotels,setHaveHotels } = HotelSlice.actions;
