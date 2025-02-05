import { useState } from "react";
import AboutWithCheckout from "../components/BookingPage/AboutWithCheckout";
import AllReviews from "../components/BookingPage/AllReviews";
import BookingPageHeading from "../components/BookingPage/BookingPageHeading";
import BookingPageImages from "../components/BookingPage/BookingPageImages";
import MapShowcase from "../components/BookingPage/MapShowcase";
import MeetHost from "../components/BookingPage/MeetHost";
import RatingSection from "../components/BookingPage/RatingSection";
import Reviews from "../components/BookingPage/Reviews";
import Navbar from "../components/Navbar/Navbar";
import BookingPageNavbar from "../components/BookingPage/BookingPageNavBar";

export default function BookingPage() {
  const [showAllReview,setShowAllReview] = useState(false);
  return (
    <>
    <BookingPageNavbar />
      {showAllReview && <AllReviews onclick={()=>{ setShowAllReview(false)}} ></AllReviews>}
      <div className="w-full min-h-screen bg-white flex justify-center">
        <div className="container w-full  md:w-4/6 flex flex-col">
          <BookingPageHeading></BookingPageHeading>
          <BookingPageImages></BookingPageImages>
          <AboutWithCheckout></AboutWithCheckout>
          <RatingSection></RatingSection>
          <Reviews onclick={()=>{ setShowAllReview(true)}} ></Reviews>
          <MapShowcase></MapShowcase>
          <MeetHost></MeetHost>
        </div>
      </div>
    </>
  );
}