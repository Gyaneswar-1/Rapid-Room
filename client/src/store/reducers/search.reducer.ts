import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    search: ""
}

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
      setSearch:(state,action)=>{
        state.search = action.payload;
      }
    },
  });

  export default searchSlice.reducer
  export const {setSearch} = searchSlice.actions