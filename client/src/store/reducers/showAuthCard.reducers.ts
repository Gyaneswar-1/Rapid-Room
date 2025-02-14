import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showSignup:false,
    showSignin: false
}

export const showAuthCardSlice = createSlice({
    name: "showAuthCardSlice",
    initialState,
    reducers: {
      flipSignUp:(state, action)=>{
        state.showSignup = !action.payload;
      },
      flipSignin:(state, action)=>{
        
        state.showSignin = !action.payload;
      },
    },
  });

  export default showAuthCardSlice.reducer
  export const {flipSignUp, flipSignin} = showAuthCardSlice.actions