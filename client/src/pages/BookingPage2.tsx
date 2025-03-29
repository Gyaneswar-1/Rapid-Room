import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReservationModal from "../components/bookingpage2/ReserVationModal";
import BookingPageSkeliton from "../components/skelitions/BookingPageSkeliton";

//import the section
import ImageCarousel from "../components/BookingPage/image-carousel";
import HotelDescription from "../components/bookingpage2/AboutThisPlace";
import GuestInfo from "../components/bookingpage2/GuestInfo";
import TopSection from "../components/bookingpage2/TopSection";
import AllReviews from "../components/bookingpage2/AllReviews";
import MapSection from "../components/bookingpage2/MapSection";
import MeetYourHost from "../components/bookingpage2/MeetYourHost";
import PriceCard from "../components/bookingpage2/PriceCard";
import RatingSection from "../components/bookingpage2/RatingSection";
import ReviewSection from "../components/bookingpage2/ReviewSection";

//state management imports
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

//state managmnt

export default function BookingPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = Number(queryParams.get("hotelId"));
  console.log(id);
  const [showSkeliton, setShowSkeliton] = useState(false);

  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  const { showReservatonModel } = useSelector(
    (state: RootState) => state.toogleShowReseveModelReducer
  );
  

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

  // Format date for display

  // Calculate number of nights

  // Show loading skeleton only if we don't have data yet
  if (showSkeliton) {
    return <BookingPageSkeliton />;
  } else {
    return (
      <div className="min-h-screen bg-white">
        <main className="container mx-auto py-6 px-1 sm:px-10 md:px-26">
          <TopSection
            type={"Luxury vills"}
            overalRating={4.5}
            totalReviews={200}
            city={"Jajpur"}
            state={"Odisha"}
            country={"India"}
          ></TopSection>

          {/* Image Carousel */}
          <ImageCarousel
            images={[
              "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/c5945f8f-a6a7-46c5-b80c-ed2f0c4f1735.jpeg?im_w=1200",
              "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/6ade3559-4ef8-41fc-88ff-71c5c8138407.jpeg?im_w=1440",
              "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/ce3c7c20-2b20-4cfc-8411-59149df323a2.jpeg?im_w=1440",
              "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/c4096073-21bc-4bd4-a9ce-ce83caa6e38b.jpeg?im_w=1440",
              "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/7425d87d-7cf4-458e-9483-3f86c08bba7f.jpeg?im_w=1440",
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <GuestInfo
                fullName={"Bibek samal"}
                numberOfGuests={6}
                profileImage=""
                roomType="Luxury villa"
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
              pricePerNight={400}
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
            perNightCost={200}
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
