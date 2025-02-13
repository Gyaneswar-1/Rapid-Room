import { Dispatch } from "@reduxjs/toolkit";
import { getHotels } from "../../service/getHotels.service";
import { getHotelsSuccess } from "../reducers/hotel.reducers";

export const asyncGetHotels =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const response = await getHotels(1, 10);
      dispatch(getHotelsSuccess(response));
      console.log("response",response);
    } catch (error) {
      // dispatch(getHotelsFailure(error));
      console.log(error);
    }
  };
