import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    hotelId: 0,
  hotelType: "",
  aboutHotel:"",
  roomType:"",
  hotelImages: ["", "", "", "", ""],
  hotelAddress: {
    state: "",
    country: "",
    longitude: "",
    latitude: "",
  },
  perNight:0,
  aboutHost:{
    name: "",
    email:"",
    hostExperience:0,
    profileImage: ""
  }

};

export const singleHotelSlice = createSlice({
    
  name: "singleHotelSlice",
  initialState,
  reducers: {
    setHotelId:(state,action)=>{
        state.hotelId = action.payload;
    },
    setHotelType: (state, action) => {
      state.hotelType = action.payload;
    },
    setAboutHotel:(state,action)=>{
        state.aboutHotel = action.payload
    },
    setHotelImages: (state, action) => {
      
      state.hotelImages = action.payload;
    },
    setHotelAddress:(state,action)=>{
        state.hotelAddress = action.payload
    },
    setRoomType:(state,action)=>{
        state.roomType = action.payload
    },
    setPerNight:(state,action)=>{
        state.perNight = action.payload
    },
    setAboutHost:(state,action)=>{
        state.aboutHost = action.payload
    }
  },
});

export default singleHotelSlice.reducer;
export const { setHotelType, setHotelImages,setHotelAddress, setAboutHotel,setRoomType, setPerNight, setAboutHost,setHotelId } = singleHotelSlice.actions;
