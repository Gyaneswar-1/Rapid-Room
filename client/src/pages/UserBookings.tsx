import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../store/reducers/mybookings.reducer";
import { RootState } from "../store/store";
import BookingCard from "../components/userBookings/booking-card";
import MessageModal from "../components/userBookings/message-model";
import Navbar from "../components/Navbar/Navbar";
import MyBookingsSkeleton from "../components/userBookings/MyBookingsSkeliton";
import getUserBookings from "../service/checkin/getUserBookings";

export default function UserBookings() {
  const dispatch = useDispatch();
  const bookingsData = useSelector(
    (state: RootState) => state.bookingsReducer.bookings
  );
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await getUserBookings();
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

  const handleMessageHost = (hostName: string) => {
    setSelectedHost(hostName);
    setIsModalOpen(true);
  };

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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-7xl mx-auto">
          {isLoading || bookingsData.length === 0 ? (
            <MyBookingsSkeleton />
          ) : (
            <>
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
                    onMessage={() =>
                      handleMessageHost(booking.hotel.host.fullName)
                    }
                  />
                ))}
              </motion.div>
            </>
          )}
        </div>

        <MessageModal
          isOpen={isModalOpen}
          hostName={selectedHost || ""}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
