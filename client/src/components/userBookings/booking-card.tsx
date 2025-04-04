import { motion } from "framer-motion";
import { MdLocationOn } from "react-icons/md";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

interface BookingCardProps {
  booking: {
    id: string;
    hotel: {
      hotelName: string;
      host: { fullName: string };
      address: {
        street: string;
        city: string;
        state: string;
        country: string;
      };
    };
    amountPaid: number;
    ReservationStatus: "active" | "pending" | "cancled";
    checkIn: string;
    checkOut: string;
  };
  onCancel: () => void;
  onMessage: () => void;
}

const BookingCard = ({ booking, onCancel, onMessage }: BookingCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48 w-full group">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src="https://imgs.search.brave.com/bmv1gqHpBlHTjtmY-cUxZXWYkPBoa4TusHhDYgic_AA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/MWhvdGVscy5jb20v/c2l0ZXMvMWhvdGVs/cy5jb20vZmlsZXMv/c3R5bGVzL2NhcmQv/cHVibGljL2JyYW5k/Zm9sZGVyL2g1YmIz/M2s1d3Fzd2t3c3E5/enZqcHQ4My8xX0hv/dGVsX1NGXy1fRXh0/ZXJpb3J3MTM2MC5w/bmc_aD02YjZlNjE5/ZSZpdG9rPWEwdHB2/MWdC"
          alt={booking.hotel.hotelName}
          className="w-full h-full object-cover transition-transform duration-300 bg-gray-200"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400?text=Hotel+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{booking.hotel.hotelName}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              booking.ReservationStatus
            )}`}
          >
            {booking.ReservationStatus.charAt(0).toUpperCase() +
              booking.ReservationStatus.slice(1)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaCalendarAlt className="text-blue-500" />
          <div className="text-sm">
            <span>{formatDate(booking.checkIn)}</span>
            <span className="mx-2">→</span>
            <span>{formatDate(booking.checkOut)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MdLocationOn className="text-red-500" />
          <p className="text-sm truncate">
            {booking.hotel.address.street}, {booking.hotel.address.city},{" "}
            {booking.hotel.address.state}, {booking.hotel.address.country}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <FaUser className="text-gray-500" />
          <p className="text-sm text-gray-600">
            Hosted by {booking.hotel.host.fullName}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">
            Amount Paid: ₹{booking.amountPaid.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onMessage}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Message Host
          </button>
          <button
            onClick={onCancel}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              booking.ReservationStatus === "cancled"
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            {booking.ReservationStatus === "cancled"
              ? "Request Refund"
              : "Cancel Booking"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
