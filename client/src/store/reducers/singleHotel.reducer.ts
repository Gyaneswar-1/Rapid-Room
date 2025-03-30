import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  hasData: false,
  hotelName:"",
  hotelId: 0,
  hotelType: "",
  aboutHotel: "",
  roomType: "",
  totalReviews: 0,
  overalRating: 0,
  hotelImages: ["", "", "", "", ""],
  hotelAddress: {
    city: "",
    street: "",
    state: "",
    country: "",
    longitude: "",
    latitude: "",
  },
  perNight: 0,
  aboutHost: {
    name: "",
    email: "",
    hostExperience: 0,
    hostRating: 0,
    hostResponseRate: 0,
    profileImage: "",
  },
};

export const singleHotelSlice = createSlice({
  name: "singleHotelSlice",
  initialState,
  reducers: {
    setHasData: (state, action) => {
      state.hasData = action.payload;
    },
    setTotalReviews: (state,action) => {
      state.totalReviews = action.payload;
    },
    setOveralRating: (state, action) => {
      state.overallRating = action.payload;
    },
    setHotelName:(state,action)=>{
      state.hotelName = action.payload;
    },
    setHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
    setHotelType: (state, action) => {
      state.hotelType = action.payload;
    },
    setAboutHotel: (state, action) => {
      state.aboutHotel = action.payload;
    },
    setHotelImages: (state, action) => {
      state.hotelImages = action.payload;
    },
    setHotelAddress: (state, action) => {
      state.hotelAddress = action.payload;
    },
    setRoomType: (state, action) => {
      state.roomType = action.payload;
    },
    setPerNight: (state, action) => {
      state.perNight = action.payload;
    },
    setAboutHost: (state, action) => {
      state.aboutHost = action.payload;
    },
  },
});

export default singleHotelSlice.reducer;
export const {
  setHotelType,
  setHotelImages,
  setHotelAddress,
  setAboutHotel,
  setRoomType,
  setPerNight,
  setAboutHost,
  setHotelId,
  setHasData,
  setHotelName,
  setOveralRating,
  setTotalReviews
} = singleHotelSlice.actions;
