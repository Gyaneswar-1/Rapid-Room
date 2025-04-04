import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookingCard from "../components/userBookings/booking-card";
import MessageModal from "../components/userBookings/message-model";
import Navbar from "../components/Navbar/Navbar";
import MyBookingsSkeleton from "../components/userBookings/MyBookingsSkeliton";

// Dummy data for development
const bookings = [
  {
    id: "1",
    user: { fullName: "John Doe" },
    hotel: {
      hotelName: "Luxury Mountain Resort",
      host: { id: 1, fullName: "Sarah Host" },
      address: {
        street: "123 Mountain View",
        city: "Shimla",
        state: "Himachal Pradesh",
        country: "India",
      },
    },
    amountPaid: 12999,
    ReservationStatus: "active" as const,
    checkIn: "2024-03-20",
    checkOut: "2024-03-25",
  },
  {
    id: "2",
    user: { fullName: "Alice Smith" },
    hotel: {
      hotelName: "Beachfront Paradise",
      host: { id: 2, fullName: "Mike Host" },
      address: {
        street: "456 Beach Road",
        city: "Puri",
        state: "Odisha",
        country: "India",
      },
    },
    amountPaid: 8999,
    ReservationStatus: "cancled" as const,
    checkIn: "2024-04-01",
    checkOut: "2024-04-05",
  },
  {
    id: "3",
    user: { fullName: "Bob Wilson" },
    hotel: {
      hotelName: "City Center Suite",
      host: { id: 3, fullName: "Lisa Host" },
      address: {
        street: "789 MG Road",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
      },
    },
    amountPaid: 15999,
    ReservationStatus: "pending" as const,
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
  },
];

export default function UserBookings() {
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingsData, setBookingsData] = useState(bookings);

  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setBookingsData(bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleMessageHost = (hostName: string) => {
    setSelectedHost(hostName);
    setIsModalOpen(true);
  };

  const handleCancelBooking = (id: string) => {
    alert(`Requesting cancellation for booking ${id}`);
  };

  return (
    <>
      <Navbar show={true} />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
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
