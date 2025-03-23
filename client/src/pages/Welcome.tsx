import HeroSection from "../components/welcomePage/HeroSection";
import Offer from "../components/welcomePage/Offer";
import Stat from "../components/welcomePage/Stat";
import UserReview from "../components/welcomePage/UserReview";
import WelcomePageNavBar from "../components/welcomePage/WelcomePageNavBar";
import WhyBest from "../components/welcomePage/WhyBest";
import { getuserData } from "../service/userdata/getuserData";
import { useEffect } from "react";
import {userStoreType} from "../store/reducers/user.reducers"

//state to store the data in the srore of user
//state management
import { AppDispatch, RootState } from "../store/store";
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
} from "../store/reducers/user.reducers";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { email,hasDataInStore }:userStoreType = useSelector((state: RootState) => state.userReducer);
  
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if(!hasDataInStore){
      getuserData()
      .then((data) => {
        console.log("data from fun",data);
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
   
  },[]);

  return (
    <main>
      <p>{email}</p>
      <WelcomePageNavBar />
      <HeroSection />
      <Offer />
      <WhyBest />
      <Stat />
      <UserReview />
    </main>
  );
}
