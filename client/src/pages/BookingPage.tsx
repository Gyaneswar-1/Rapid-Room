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

//state management imports


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
  setHasData
} from "../store/reducers/singleHotel.reducer";
import { useDispatch, useSelector } from "react-redux";
import SetUserDataToStore from "../service/userdata/SetDataToStore";

//state managmnt

export default function BookingPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));
  const [showSkeliton, setShowSkeliton] = useState(false);
  

  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  const { showReservatonModel } = useSelector(
    (state: RootState) => state.toogleShowReseveModelReducer
  );
  const {
    hotelType,
    hotelImages,
    hotelAddress,
    aboutHotel,
    roomType,
    perNight,
    aboutHost,
    hasData,
  } = useSelector((state: RootState) => state.singleHotelReducer);
  const dispatch: AppDispatch = useDispatch();
  console.log(hotelType,hotelImages)

  useEffect(() => {
    if(!hasData){
      getSingleHotelInformation(id)
      .then(async (res) => {
        if (res.success === true) {
          //here set the data to the store user recoil or redux for better state management
          console.log("here is the data from backend",res.data);
          dispatch(setHasData(true));
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
    }
      
    }, []);
  
    //for temporary use only
    const images =  [
      hotelImages[0].imageUrl,
      hotelImages[1].imageUrl,
      hotelImages[2].imageUrl,
      hotelImages[3].imageUrl,
      hotelImages[4].imageUrl,
    ]
  
    console.log("Here is th hotel imags",images)
  // Example hotel data structure

  const hotelReviewsx = [
    {
      id: 1,
      author: "Michael R.",
      date: "February 2025",
      content:
        "Amazing place with stunning views. The host was very responsive and helpful throughout our stay.",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 2,
      author: "Jessica T.",
      date: "January 2025",
      content:
        "Beautiful property in a perfect location. Everything was clean and well-maintained. Would definitely stay again!",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 3,
      author: "David L.",
      date: "December 2024",
      content:
        "Great experience overall. The villa was exactly as described and the amenities were top-notch.",
      rating: 4,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 4,
      author: "Emma W.",
      date: "November 2024",
      content:
        "We had a wonderful stay at this villa. The views were incredible and the amenities were perfect. Sarah was an excellent host.",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 5,
      author: "Robert K.",
      date: "October 2024",
      content:
        "Fantastic location and beautiful property. Everything was as described and the host was very accommodating.",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      id: 6,
      author: "Sophia L.",
      date: "September 2024",
      content:
        "The villa exceeded our expectations. It was clean, spacious, and had all the amenities we needed. Would highly recommend!",
      rating: 5,
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ];


  if (showSkeliton) {
    return <BookingPageSkeliton />;
  } else {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto py-6 px-1 sm:px-10 md:px-26">
          <TopSection
            type={hotelType}
            overalRating={2.2}
            totalReviews={200}
            city={hotelAddress.city}
            state={hotelAddress.state}
            country={hotelAddress.country}
          ></TopSection>

          {/* Image Carousel */}
          <ImageCarousel
            images={images}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GuestInfo
                fullName={aboutHost.fullName}
                numberOfGuests={6}
                profileImage={aboutHost.profileImage}
                roomType={hotelType}
              ></GuestInfo>

              <HotelDescription
                description={"this is a brief hotel description"}
              ></HotelDescription>

              {/* Refactored "What guests are saying" section */}
              <RatingSection
                accuracy={1}
                checkIn={2}
                cleanliness={3}
                communication={4}
                location={3}
                value={4}
              ></RatingSection>

              {/* Reviews Section */}
              <ReviewSection
                overalRating={10}
                totalReviews={200}
                reviews={hotelReviewsx}
              ></ReviewSection>

              <MeetYourHost
                fullName={"Bibek samal"}
                hostExperience={10}
                hostRating={5}
                hostResponseRate={100}
                profileImage="image"
                totalReviews={200}
              ></MeetYourHost>
            </div>

            {/* Modified Price Card - Removed check-in/out and guest selection */}
            <PriceCard
              cleaningFee={100}
              serviceFee={100}
              overalRating={5}
              pricePerNight={perNight}
              totalReviews={200}
            ></PriceCard>
          </div>

          {/* Map Section */}
          <MapSection
            city="Jajpur"
            country="India"
            latitude={0}
            longitude={0}
            state="Odisha"
            street="nh45"
          ></MapSection>
        </main>

        {/* Reviews Modal */}
        {showAllReview && (
          <AllReviews
            accuracy={2}
            checkIn={3}
            cleanliness={4}
            location={3}
            communication={5}
            overall={4}
            reviews={hotelReviewsx}
            totalReviews={200}
            value={4}
          ></AllReviews>
        )}

        {/* Reservation Modal */}
        {showReservatonModel && (
          <ReservationModal
            city="Jajpu"
            cleaningFee={100}
            country={"india"}
            hotelName="mayfair"
            overallRating={4}
            perNightCost={perNight}
            serviceFee={100}
            state={"Odisha"}
            totalRating={200}
          />
        )}
      </div>
    );
  }
}

function BookingPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="h-10 w-2/3 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-5 w-1/2 bg-gray-200 rounded-md mb-6"></div>

        <div className="h-96 w-full bg-gray-200 rounded-lg mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-24 w-full bg-gray-200 rounded-md"></div>
            </div>
            <div>
              <div className="h-8 w-1/2 bg-gray-200 rounded-md mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-12 w-full bg-gray-200 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-96 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
