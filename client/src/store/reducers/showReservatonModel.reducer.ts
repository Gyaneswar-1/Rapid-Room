import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showReserveModel: false
}

export const showReserveModelSlice = createSlice({
    name: "showReserveModelSlice",
    initialState,
    reducers: {
      setShowReservModel:(state,action)=>{
        state.showReservatonModel = action.payload;
      }
    },
  });

  export default showReserveModelSlice.reducer
  export const {setShowReservModel} = showReserveModelSlice.actions