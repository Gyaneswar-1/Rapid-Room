
import { useState } from "react"
import { motion } from "framer-motion"
import { FaHotel, FaMapMarkerAlt, FaUser, FaDollarSign, FaTimes, FaEnvelope } from "react-icons/fa"

interface Booking {
  id: string
  userName: string
  hostName: string
  hotelName: string
  location: string
  price: number
  image: string
}

interface BookingCardProps {
  booking: Booking
  onCancel: () => void
  onMessage: () => void
}

export default function BookingCard({ booking, onCancel, onMessage }: BookingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <img src={booking.image || "/placeholder.svg"} alt={booking.hotelName} className="object-fill" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute  inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end"
        >
          <motion.h3
            className="text-white font-bold text-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {booking.hotelName}
          </motion.h3>
        </motion.div>
      </div>

      <div className="p-5">
        <div className="flex items-center mb-3">
          <FaHotel className="text-gray-500 mr-2" />
          <h3 className="font-semibold text-lg text-gray-800">{booking.hotelName}</h3>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-gray-400" />
            <span>{booking.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaUser className="mr-2 text-gray-400" />
            <span>Booked by: {booking.userName}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaUser className="mr-2 text-gray-400" />
            <span>Host: {booking.hostName}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <FaDollarSign className="mr-2 text-gray-400" />
            <span>${booking.price} per night</span>
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-md flex items-center"
            onClick={onCancel}
          >
            <FaTimes className="mr-2" />
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-md flex items-center"
            onClick={onMessage}
          >
            <FaEnvelope className="mr-2" />
            Message Host
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

