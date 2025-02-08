import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducers";
import hotelReducer from "./reducers/hotel.reducers"

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    hotelReducer: hotelReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;