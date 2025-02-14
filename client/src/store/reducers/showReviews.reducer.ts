import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    showAllReview: false,
}

export const toogleAllReviewsSlice = createSlice({
    name: "showAllReviewsSlice",
    initialState,
    reducers:{
        toogleAllReviews:(state,action)=>{
            state.showAllReview = !action.payload
        }
    }
})

export default toogleAllReviewsSlice.reducer
export const {toogleAllReviews} = toogleAllReviewsSlice.actions