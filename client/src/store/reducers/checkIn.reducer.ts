import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    checkInDate: new Date(),
    checkOutDate: new Date(),
    hotelId: 0,
    reservationId: 0,
    paymentId: 0,
    roomId: 0,
}

export const checkInSlice = createSlice({
    name: "checkInSlice",
    initialState,
    reducers: {
      setCheckInDate: (state, action) => {
        state.checkInDate = action.payload;
      },
      setCheckOutDate: (state, action)=>{
        state.checkOutDate = action.payload;
      },
      setHotelIdForCheckIn: (state,action) => {
        state.hotelId = action.payload;
      },
      setReservationId: (state,action) =>{
        state.reservationId = action.payload;
      },
      setPaymentId: (state,action) => {
        state.paymentId = action.payload;
      },
      setRoomId: (state,action) => {
        state. roomId = action.payload;
      }
    },
  });

  export default checkInSlice.reducer
  export const {setCheckInDate, setCheckOutDate, setHotelIdForCheckIn, setPaymentId,setReservationId, setRoomId} = checkInSlice.actions