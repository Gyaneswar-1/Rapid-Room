import { Dispatch } from "@reduxjs/toolkit";
import { getHotels } from "../../service/getHotels.service";
import { getHotelsFailure, getHotelsSuccess } from "../reducers/hotel.reducers";

export const asyncGetHotels =
  () => async (dispatch: Dispatch, getState: any) => {
    try {
      const response = await getHotels(1, 10);
      dispatch(getHotelsSuccess(response));
    } catch (error) {
      dispatch(getHotelsFailure(error));
    }
  };
