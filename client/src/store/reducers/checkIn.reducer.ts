import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    totalAmount:0,
    stayingFor:0
}

export const checkInSlice = createSlice({
    name: "checkInSlice",
    initialState,
    reducers: {
      setTotalAmount:(state,action)=>{
        state.totalAmount = action.payload
      },
      setStayingFor:(state,action)=>{
        state.stayingFor = action.payload
      }
    },
  });

  export default checkInSlice.reducer
  export const {setTotalAmount,setStayingFor} = checkInSlice.actions