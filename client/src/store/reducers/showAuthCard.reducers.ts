import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showSignup:false,
    showSignin: false,
    showOtpVerificaton: false,
    showForgotPass: false,
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
      flipOtpverificaton: (state, action) => {
        state.showOtpVerificaton = !action.payload
      },
      flipForgotPass:(state,action) =>{
        state.showForgotPass = !action.payload;
      }
    },
  });

  export default showAuthCardSlice.reducer
  export const {flipSignUp, flipSignin, flipOtpverificaton, flipForgotPass} = showAuthCardSlice.actions