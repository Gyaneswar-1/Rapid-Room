import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReservationModal from "../components/bookingpage/ReserVationModal";
import BookingPageSkeliton from "../components/skelitions/BookingPageSkeliton";

//import the section
import Navbar from "../components/Navbar/Navbar";
import ImageCarousel from "../components/bookingpage/ImageCarousal";
import HotelDescription from "../components/bookingpage/AboutThisPlace";
import GuestInfo from "../components/bookingpage/GuestInfo";
import TopSection from "../components/bookingpage/TopSection";
import AllReviews from "../components/bookingpage/AllReviews";
import MapSection from "../components/bookingpage/MapSection";
import MeetYourHost from "../components/bookingpage/MeetYourHost";
import PriceCard from "../components/bookingpage/PriceCard";
import RatingSection from "../components/bookingpage/RatingSection";
import ReviewSection from "../components/bookingpage/ReviewSection";

//get hotel service
import getSingleHotelInformation from "../service/getSingleHotelInformation/getSingleHotelInfo";

import { AppDispatch, RootState } from "../store/store";
import { setAllHotelData } from "../store/reducers/singleHotel.reducer"; // Only import setAllHotelData
import { setHotelIdForCheckIn } from "../store/reducers/checkIn.reducer";
import { useDispatch, useSelector } from "react-redux";
import SetUserDataToStore from "../service/userdata/SetDataToStore";
import { useNavigate } from "react-router-dom";
import AmenitiesSection from "../components/bookingpage/AmenitiesSection";

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));
  if (!id) {
    navigate("/home");
  }
  const [showSkeliton, setShowSkeliton] = useState(false);

  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  const { showReservatonModel } = useSelector(
    (state: RootState) => state.toogleShowReseveModelReducer
  );
  
  const {
    images = [],
    roomType,
    perNight,
    hotelName,
    totalReviews,
    overalRating,
    guestAllowed,
    address = {
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
      street: "",
    },
    host = {
      fullName: "",
      profileImage: "",
      hostExperience: 0,
      hostRating: 0,
      hostResponseRate: 0,
    },
    description,
    reviews = [],
    amenities={
      hasParking: false,
      hasPool: false,
      hasWifi: false,
      hasTv: false,
      hasBalcony: false,
      hasKitchen: false,
      hasWorkSpace: false,
      hasWashingMachine: false,
      hasGarden: false,
      hasAirConditioning: false,
      hasDiningArea: false,
      hasHotTub: false,
      hasFirepit: false,
      hasBBQGrill: false,
      hasPoolTable: false,
      hasExerciseEquipment: false,
      hasOutdoorShower: false,
      hasSmokeAlarm: false,
      hasFirstAidKit: false,
      hasFireExtinguisher: false,
      hasAccessibility: false,
    },
    isWishlisted,
  } = useSelector((state: RootState) => state.singleHotelReducer);

  const dispatch: AppDispatch = useDispatch();
  dispatch(setHotelIdForCheckIn(id)); // Remove the setHotelId dispatch since it's now part of setAllHotelData

  useEffect(() => {
    if (id) {
      setShowSkeliton(true);
      getSingleHotelInformation(id)
        .then((res) => {
          if (res.success) {
            dispatch(setAllHotelData(res.data));
            setShowSkeliton(false);
          } else {
            navigate("/home");
          }
        })
        .catch((err) => {
          console.error("Error fetching hotel info:", err);
          navigate("/home");
        });
    }
  }, [id]);

  if (showSkeliton) {
    return <BookingPageSkeliton />;
  }

  return (
    <>
      <Navbar show={true} />
      <div className="min-h-screen bg-white md:py-14 ">
        <main className="container md:mx-auto py-6 px-1 sm:px-10 pt-14 md:px-26">
          <TopSection
            type={hotelName}
            overalRating={overalRating}
            totalReviews={totalReviews}
            city={address.city}
            state={address.state}
            country={address.country}
            isWishlisted={isWishlisted}
          />

          <ImageCarousel
            images={images.map((img) => img?.imageUrl || "/placeholder.svg")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GuestInfo
                fullName={host.fullName}
                numberOfGuests={guestAllowed}
                profileImage={host.profileImage}
                roomType={roomType}
              />

              <HotelDescription description={description} />
              <AmenitiesSection
                hasWifi={amenities.hasWifi}
                hasTV={amenities.hasTv}
                hasKitchen={amenities.hasKitchen}
                hasBalcony={amenities.hasBalcony}
                hasWorkspace={amenities.hasWorkSpace}
                hasWashingMachine={amenities.hasWashingMachine}
                hasGarden={amenities.hasGarden}
                hasParking={amenities.hasParking}
                hasAirConditioning={amenities.hasAirConditioning}
                hasDiningArea={amenities.hasDiningArea}
                hasPool={amenities.hasPool}
                hasHotTub={amenities.hasHotTub}
                hasFirepit={amenities.hasFirepit}
                hasBBQGrill={amenities.hasBBQGrill}
                hasPoolTable={amenities.hasPoolTable}
                hasExerciseEquipment={amenities.hasExerciseEquipment}
                hasOutdoorShower={amenities.hasOutdoorShower}
                hasSmokeAlarm={amenities.hasSmokeAlarm}
                hasFirstAidKit={amenities.hasFirstAidKit}
                hasFireExtinguisher={amenities.hasFireExtinguisher}
                hasAccessibility={amenities.hasAccessibility}
              />
              <RatingSection
                accuracy={reviews[0]?.accuracyRating || 0}
                checkIn={reviews[0]?.checkInRating || 0}
                cleanliness={reviews[0]?.cleanlinessRating || 0}
                communication={reviews[0]?.communicationRating || 0}
                location={reviews[0]?.locationRating || 0}
                value={reviews[0]?.priceRating || 0}
              />

              <ReviewSection
                overalRating={overalRating}
                totalReviews={totalReviews}
                reviews={reviews.map((review) => ({
                  id: review.userId,
                  author: review.user.fullName,
                  date: new Date().toLocaleDateString(),
                  content: review.reviewComment,
                  rating: review.overallRating,
                  avatar: review.user.profileImage,
                }))}
              />

              <MeetYourHost
                fullName={host.fullName}
                hostExperience={host.hostExperience || 0}
                hostRating={host.hostRating}
                hostResponseRate={host.hostResponseRate}
                profileImage={host.profileImage}
                totalReviews={totalReviews}
              />
            </div>

            <PriceCard
              cleaningFee={100}
              serviceFee={100}
              overalRating={overalRating}
              pricePerNight={perNight}
              totalReviews={totalReviews}
            />
          </div>

          <MapSection
            city={address.city}
            country={address.country}
            latitude={Number(address.latitude)}
            longitude={Number(address.longitude)}
            state={address.state}
            street={address.street}
          />
        </main>

        {showAllReview && (
          <AllReviews
          accuracy={reviews[0]?.accuracyRating || 0}
          checkIn={reviews[0]?.checkInRating || 0}
          cleanliness={reviews[0]?.cleanlinessRating || 0}
          communication={reviews[0]?.communicationRating || 0}
          location={reviews[0]?.locationRating || 0}
          value={reviews[0]?.priceRating || 0}
          overall={overalRating}
            reviews={reviews.map((review) => ({
              id: review.userId,
              author: review.user.fullName,
              date: new Date().toLocaleDateString(),
              content: review.reviewComment,
              rating: review.overallRating,
              avatar: review.user.profileImage,
            }))}
            totalReviews={totalReviews}
            
          />
        )}

        {showReservatonModel && (
          <ReservationModal
            city={address.city}
            cleaningFee={100}
            country={address.country}
            hotelName={hotelName}
            overallRating={overalRating}
            perNightCost={perNight}
            serviceFee={100}
            state={address.state}
            totalRating={totalReviews}
          />
        )}
        <SetUserDataToStore />
      </div>
    </>
  );
}
