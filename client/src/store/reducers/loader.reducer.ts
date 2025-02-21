import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showLoader: false
}

export const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState,
    reducers: {
      setShowLoader:(state)=>{
        
        state.showLoader = !state.showLoader;
      }
    },
  });

  export default loaderSlice.reducer
  export const {setShowLoader} = loaderSlice.actions