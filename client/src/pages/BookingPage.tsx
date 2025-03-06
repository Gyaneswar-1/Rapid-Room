import { useEffect, useState } from "react";
import AboutWithCheckout from "../components/BookingPage/AboutWithCheckIn";
import AllReviews from "../components/BookingPage/AllReviews";
import BookingPageHeading from "../components/BookingPage/BookingPageHeading";
import BookingPageImages from "../components/BookingPage/BookingPageImages";
import MapShowcase from "../components/BookingPage/MapShowcase";
import MeetHost from "../components/BookingPage/MeetHost";
import RatingSection from "../components/BookingPage/RatingSection";
import Reviews from "../components/BookingPage/Reviews";
import BookingPageNavbar from "../components/BookingPage/BookingPageNavBar";
import BookingPageSkeliton from "../components/skelitions/BookingPageSkeliton";
import getSingleHotelInformation from "../service/getSingleHotelInformation/getSingleHotelInfo";
import { useLocation} from "react-router-dom";

//state management
import { AppDispatch, RootState } from "../store/store";
import {
  setHotelType,
  setHotelImages,
  setHotelAddress,
  setAboutHotel,
  setRoomType,
  setPerNight,
  setAboutHost,
  setHotelId,
} from "../store/reducers/singleHotel.reducer";
import { useDispatch, useSelector } from "react-redux";

export default function BookingPage() {
  //delay functon
  // async function delay() {
  //   await new Promise((res) => {
  //     setTimeout(() => {
  //       res("");
  //     }, 1500);
  //   });
  // }

  //state management
  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  const {
    hotelType,
    hotelImages,
    hotelAddress,
    aboutHotel,
    roomType,
    perNight,
    aboutHost,
  } = useSelector((state: RootState) => state.singleHotelReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(hotelType,hotelImages)
  const [showSkeliton, setShowSkeliton] = useState(true);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));
  dispatch(setHotelId(id));
  useEffect(() => {
    getSingleHotelInformation(id)
      .then(async (res) => {
        if (res.success === true) {
          //here set the data to the store user recoil or redux for better state management
          console.log(res.data);
          dispatch(setHotelType(res.data.type));
          dispatch(setHotelImages(res.data.images));
          dispatch(
            setHotelAddress({
              city: res.data.address.city,
              street: res.data.address.street,
              state: res.data.address.state,
              country: res.data.address.country,
              longitude: res.data.address.longitude,
              latitude: res.data.address.latitude,
            })
          );
          dispatch(setAboutHotel(res.data.description));
          dispatch(setRoomType(res.data.roomType));
          dispatch(setPerNight(res.data.perNight));
          dispatch(
            setAboutHost({
              name: res.data.host.fullName,
              email: res.data.host.email,
              hostExperience: res.data.host.hostExperience,
              hostRating: res.data.host.hostRating,
              hostResponseRate: res.data.host.hostResponseRate,
              profileImage: res.data.host.profileImage,
            })
          );
          // await delay();
          setShowSkeliton(false);
        } else {
          // navigate("/home");
        }
      })
      .catch((err) => {
        console.log("error in the booking page catch", err);
        // navigate("/home");
      });
  }, []);

  return (
    <>
      <BookingPageNavbar />

      {showAllReview && (
        <AllReviews
          overallRating={4.9}
          totalReviews={4}
          accuracyRating={4.3}
          checkInRating={4.9}
          cleanlinessRating={4.2}
          communicationRating={3.8}
          locationRating={4.5}
          parkingRating={3.6}
          valueRating={3.8}
        ></AllReviews>
      )}
      {showSkeliton ? (
        <BookingPageSkeliton></BookingPageSkeliton>
      ) : (
        <div className="w-full min-h-screen bg-white flex justify-center">
          <div className="container w-full  md:w-4/6 flex flex-col ">
            <BookingPageHeading hotelType="Apartment with terrace, balcony+ breakfast"></BookingPageHeading>
            <BookingPageImages
              // img1={hotelImages[0].imageUrl}
              // img2={hotelImages[1].imageUrl}
              // img3={hotelImages[2].imageUrl}
              // img4={hotelImages[3].imageUrl}
              // img5={hotelImages[4].imageUrl}
              img1={""}
              img2={""}
              img3={""}
              img4={""}
              img5={""}
            ></BookingPageImages>
            <AboutWithCheckout
              country={hotelAddress.country}
              state={hotelAddress.state}
              roomType={roomType}
              totalReviews={4}
              overalRating={4.9}
              hostImage={aboutHost.profileImage}
              hostName={aboutHost.name}
              hostExperienceYear={aboutHost.hostExperience}
              aboutThisPlace={aboutHotel}
              perNight={perNight}
              cleaningFee={100}
              numberOfGuests={4}
            ></AboutWithCheckout>
            <RatingSection
              overalRating={4.9}
              accuracyRating={4.3}
              checkInRating={4.9}
              cleanlinessRating={4.2}
              communicationRating={3.8}
              locationRating={4.5}
              parkingRating={3.6}
              valueRating={3.8}
            ></RatingSection>
            <Reviews></Reviews>
            <MapShowcase
              country={hotelAddress.country}
              city={hotelAddress.city}
              state={hotelAddress.state}
              street={hotelAddress.street}
              longitude={Number(hotelAddress.longitude)}
              latitude={Number(hotelAddress.latitude)}
            ></MapShowcase>
            <MeetHost
              hostImage={aboutHost.profileImage}
              hostName={aboutHost.name}
              totalReveiws={123}
              hostRating={aboutHost.hostRating}
              hostExperienceYear={2}
              hostResponseRate={100}
            ></MeetHost>
          </div>
        </div>
      )}
    </>
  );
}
