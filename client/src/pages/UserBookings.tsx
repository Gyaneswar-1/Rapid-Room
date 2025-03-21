

import { useState } from "react"
import { motion } from "framer-motion"
import BookingCard from "../components/userBookings/booking-card"
import MessageModal from "../components/userBookings/message-model"
import Navbar from "../components/Navbar/Navbar"

// Sample booking data - in a real app, this would come from an API
const bookings = [
  {
    id: "1",
    userName: "John Doe",
    hostName: "Sarah Smith",
    hotelName: "Seaside Resort",
    location: "Miami, FL",
    price: 299,
    image: "https://a0.muscache.com/im/pictures/32c1a80d-c344-4fd6-ad5b-aad85ec39b4d.jpg?height=200&width=300",
  },
  {
    id: "2",
    userName: "Jane Wilson",
    hostName: "Michael Brown",
    hotelName: "Mountain View Lodge",
    location: "Aspen, CO",
    price: 399,
    image: "https://a0.muscache.com/im/pictures/32c1a80d-c344-4fd6-ad5b-aad85ec39b4d.jpg?height=200&width=300",
  },
  {
    id: "3",
    userName: "Robert Johnson",
    hostName: "Emily Davis",
    hotelName: "City Center Hotel",
    location: "New York, NY",
    price: 499,
    image: "https://a0.muscache.com/im/pictures/32c1a80d-c344-4fd6-ad5b-aad85ec39b4d.jpg?height=200&width=300",
  },
]

export default function UserBookings() {
  const [selectedHost, setSelectedHost] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMessageHost = (hostName: string) => {
    setSelectedHost(hostName)
    setIsModalOpen(true)
  }

  const handleCancelBooking = (id: string) => {
    // In a real app, this would call an API to cancel the booking
    alert(`Booking ${id} cancelled`)
  }

  return (
    <>
    <Navbar show={true} ></Navbar>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Your Bookings</h1>
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
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={() => handleCancelBooking(booking.id)}
              onMessage={() => handleMessageHost(booking.hostName)}
            />
          ))}
        </motion.div>
      </div>

      <MessageModal isOpen={isModalOpen} hostName={selectedHost || ""} onClose={() => setIsModalOpen(false)} />
    </div>
    </>
  )
}

