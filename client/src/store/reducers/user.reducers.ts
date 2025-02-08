import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [
    { name: "John", email: " john@gmail.com" },
    { name: " Doe", email: "doe@gmail.com" },
  ],
};

export const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        getuser:(state,action)=>{
            state.user = action.payload;
        }
    }
})

export default UserSlice.reducer;
export const {getuser} = UserSlice.actions;