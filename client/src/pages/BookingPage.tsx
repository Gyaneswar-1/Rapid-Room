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
import { useLocation, useNavigate } from "react-router-dom";

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
  setHotelId
} from "../store/reducers/singleHotel.reducer";
import { useDispatch, useSelector } from "react-redux";

export default function BookingPage() {
  //delay functon
  async function delay() {
    await new Promise((res) => {
      setTimeout(() => {
        res("");
      }, 1500);
    });
  }

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

  const [showSkeliton, setShowSkeliton] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));
  dispatch(setHotelId(id));
  useEffect(() => {
    getSingleHotelInformation(id)
      .then(async (res) => {
        if (res.success === true) {
          console.log(res.data);
          console.log("here is the address", res.data.address);
          //here set the data to the store user recoil or redux for better state management

          dispatch(setHotelType(res.data.type));
          dispatch(setHotelImages(res.data.images));
          dispatch(
            setHotelAddress({
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
              hostExperience: res.data.host.hostExperience,
              email: res.data.host.email,
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

      {showAllReview && <AllReviews></AllReviews>}
      {showSkeliton ? (
        <BookingPageSkeliton></BookingPageSkeliton>
      ) : (
        <div className="w-full min-h-screen bg-white flex justify-center">
          <div className="container w-full  md:w-4/6 flex flex-col ">
            <BookingPageHeading hotelType="Apartment with terrace, balcony+ breakfast"></BookingPageHeading>
            <BookingPageImages
              img1={hotelImages[0]}
              img2={hotelImages[1]}
              img3={hotelImages[2]}
              img4={hotelImages[3]}
              img5={hotelImages[4]}
            ></BookingPageImages>
            <AboutWithCheckout
              country={hotelAddress.country}
              state={hotelAddress.state}
              roomType={roomType}
              totalReviews={135}
              overalRating={3.5}
              hostImage="https://a0.muscache.com/im/pictures/user/e349f69e-6f7f-4a69-98ef-391baafed14a.jpg?im_w=240&im_format=avif"
              hostName={aboutHost.name}
              hostExperienceYear={aboutHost.hostExperience}
              aboutThisPlace={aboutHotel}
              perNight={perNight}
              cleaningFee={100}
              numberOfGuests={4}
            ></AboutWithCheckout>
            <RatingSection
              overalRating={5.1}
              cleanlinessRating={2.1}
              accuracyRating={3.3}
              checkInRating={3.3}
              communicationRating={3.3}
              locationRating={3.3}
              valueRating={3.3}
              parkingRating={4.1}
            ></RatingSection>
            <Reviews></Reviews>
            <MapShowcase
              longitude={hotelAddress.longitude}
              latitude={hotelAddress.latitude}
            ></MapShowcase>
            <MeetHost
              hostImage=""
              hostName="bibek samal"
              totalReveiws={123}
              hostRating={1.2}
              hostExperienceYear={2}
              hostResponseRate={100}
            ></MeetHost>
          </div>
        </div>
      )}
    </>
  );
}
