import { getuserData } from "./getuserData";
import {userStoreType} from "../../store/reducers/user.reducers"
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import {
  setHasDataInStore,
  setUserCity,
  setUserCountry,
  setUserCreatedAt,
  setUserEmail,
  setUserFullName,
  setUserGovId,
  setUserHostExperience,
  setUserHostRating,
  setUserHostResponseRate,
  setUserID,
  setUserIsHost,
  setUserLatitude,
  setUserLongitude,
  setUserPhoneNumber,
  setUserProfileImage,
  setUserState,
  setUserStreet,
  setUserZipCode,
  setUserStatus
} from "../../store/reducers/user.reducers";
import { useEffect } from "react";


export default function SetUserDataToStore(){
   const { hasDataInStore,email,profileImage }:userStoreType = useSelector((state: RootState) => state.userReducer);
   const dispatch: AppDispatch = useDispatch();   
   useEffect(()=>{
    if(!hasDataInStore){
        getuserData()
        .then((data) => {
          if (data.success === true) {
            dispatch(setHasDataInStore(true));
            dispatch(setUserEmail(data.email));
            dispatch(setUserID(data.id));
            dispatch(setUserFullName(data.fullName));
            dispatch(setUserEmail(data.email));
            dispatch(
              setUserPhoneNumber(
                data.phoneNumber ? Number(data.phoneNumber) : null
              )
            );
            dispatch(setUserGovId(data.GovID ? Number(data.GovID) : null));
            dispatch(setUserIsHost(data.isHost));
            dispatch(setUserHostExperience(data.hostExperience));
            dispatch(setUserHostRating(data.hostRating));
            dispatch(setUserHostResponseRate(data.hostResponseRate));
            dispatch(setUserProfileImage(data.profileImage));
            dispatch(setUserCreatedAt(data.createdAt));
            dispatch(setUserStreet(data.street || ""));
            dispatch(setUserCity(data.city || ""));
            dispatch(setUserState(data.state || ""));
            dispatch(setUserZipCode(data.zipCode || ""));
            dispatch(setUserCountry(data.country || ""));
            dispatch(setUserStatus(data.status));
            dispatch(
              setUserLatitude(data.latitude ? Number(data.latitude) : null)
            );
            dispatch(
              setUserLongitude(data.longitude ? Number(data.longitude) : null)
            );
          }
        })
        .catch((err: any) => {
          console.log("error in user Data", err);
        });
      }
   },[])
   console.log("Datas",email,profileImage);
   
   return(
    <>
    </>
   )
}