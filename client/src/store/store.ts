import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducers";
import hotelReducer from "./reducers/hotel.reducers";
import showAuthCardReducer from "./reducers/showAuthCard.reducers"
import emailReducer from "./reducers/email.reducer"
import toogleAllReviewsReducer from "./reducers/showReviews.reducer"
import checkInReducer from "./reducers/checkIn.reducer"

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    hotelReducer: hotelReducer,
    showAuthCardReducer: showAuthCardReducer,
    emailReducer: emailReducer,
    toogleAllReviewsReducer: toogleAllReviewsReducer,
    checkInReducer: checkInReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;