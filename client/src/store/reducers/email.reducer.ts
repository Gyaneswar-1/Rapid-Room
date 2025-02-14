import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    email: ""
}

export const emailSlice = createSlice({
    name: "emailSlice",
    initialState,
    reducers: {
      setEmail:(state,action)=>{
        state.email = action.payload;
      }
    },
  });

  export default emailSlice.reducer
  export const {setEmail} = emailSlice.actions