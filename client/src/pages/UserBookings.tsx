import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../store/reducers/mybookings.reducer";
import { RootState } from "../store/store";
import BookingCard from "../components/userBookings/booking-card";
import AddRatingCard from "../components/bookingpage/AddRatingCard";
import Navbar from "../components/Navbar/Navbar";
import MyBookingsSkeleton from "../components/userBookings/MyBookingsSkeliton";
import getUserBookings from "../service/checkin/getUserBookings";
import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import SetUserDataToStore from "../service/userdata/SetDataToStore";

export default function UserBookings() {
  const dispatch = useDispatch();
  const bookingsData = useSelector(
    (state: RootState) => state.bookingsReducer.bookings
  );
  const { showAddReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await getUserBookings();
        console.log("Here is the bookings data", response.data);
        if (response.success) {
          dispatch(setBookings(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Reset bookings to empty array before fetching
    dispatch(setBookings([]));
    fetchBookings();
  }, [dispatch]);

  const handleCancelBooking = (id: number) => {
    // Update the bookings data to reflect the cancellation
    dispatch(
      setBookings(
        bookingsData.map((booking) =>
          booking.id === id
            ? { ...booking, ReservationStatus: "cancled" }
            : booking
        )
      )
    );
  };

  return (
    <>
      <Navbar show={true} />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32  mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Bookings
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Manage all your hotel reservations in one place
            </p>
          </motion.div>

          {isLoading ? (
            <MyBookingsSkeleton />
          ) : bookingsData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow text-center max-w-2xl mx-auto"
            >
              <Calendar className="h-16 w-16 mx-auto text-primary mb-4 opacity-70" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                You don't have any bookings yet
              </h2>
              <p className="text-gray-500 mb-6">
                Explore our collection of amazing properties and book your next
                stay!
              </p>
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Find Hotels <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {bookingsData.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={() => handleCancelBooking(booking.id)}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* do conditional rendering of the review add section */}
        {showAddReview ? <AddRatingCard></AddRatingCard> : null}
      </div>
       <SetUserDataToStore/>
    </>
  );
}
