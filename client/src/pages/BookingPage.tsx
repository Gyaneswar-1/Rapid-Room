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

export default function BookingPage() {
  const [showSkeliton, setShowSkeliton] = useState(true);
  const [showAllReview, setShowAllReview] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));

  useEffect(()=>{
     getSingleHotelInformation(id)
     .then(async (data)=>{
        if(data.success === true){
          console.log(data.data);
          //here set the data to the store user recoil or redux for better state management
          setShowSkeliton(false);
        }
        else{
          // navigate("/home");
        }
     })
     .catch((err)=>{
        // navigate("/home");
     })
  },[])

  if (showSkeliton) {
    return (
      <>
        <BookingPageNavbar />
        <BookingPageSkeliton></BookingPageSkeliton>
      </>
    );
  } else {
    return (
      <>
        <BookingPageNavbar />

        {showAllReview && (
          <AllReviews
            onclick={() => {
              setShowAllReview(false);
            }}
          ></AllReviews>
        )}

        <div className="w-full min-h-screen bg-white flex justify-center">
          <div className="container w-full  md:w-4/6 flex flex-col ">
            <BookingPageHeading hotelType="Apartment with terrace, balcony+ breakfast"></BookingPageHeading>
            <BookingPageImages
              img1=""
              img2=""
              img3=""
              img4=""
              img5=""
            ></BookingPageImages>
            <AboutWithCheckout
              country="India"
              state="Odisha"
              roomType="1 double bedPrivate attached bathroom"
              totalReviews={135}
              overalRating={3.5}
              hostImage="https://a0.muscache.com/im/pictures/user/e349f69e-6f7f-4a69-98ef-391baafed14a.jpg?im_w=240&im_format=avif"
              hostName="Bibek"
              hostExperienceYear={8}
              aboutThisPlace="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam ea
            libero quaerat corrupti! Possimus, suscipit. Eum iusto, beatae error
            repudiandae odit ex rerum ratione, nobis porro quos suscipit
            voluptatem nisi!"
              perNight={3000}
              cleaningFee={100}
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
            <Reviews
              onclick={() => {
                setShowAllReview(true);
              }}
            ></Reviews>
            <MapShowcase
              longitude={20.684607359715745}
              latitude={86.16374122241754}
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
      </>
    );
  }
}
