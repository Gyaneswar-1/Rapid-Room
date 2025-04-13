import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showAllReview: false,
    showAddReview: false,
    hotelId:0
}

export const toogleAllReviewsSlice = createSlice({
    name: "showAllReviewsSlice",
    initialState,
    reducers:{
        toogleAllReviews:(state,action)=>{
            state.showAllReview = !action.payload;
        },
        flipAddReview: (state,action)=>{
            state.showAddReview = !action.payload;
        },
        setHotelId:(state,action)=>{
            state.hotelId = action.payload;
        }
    }
})

export default toogleAllReviewsSlice.reducer
export const {toogleAllReviews,flipAddReview,setHotelId} = toogleAllReviewsSlice.actions