import { useEffect, useRef, useState } from "react";
import { setReservationStatusRefunded } from "../service/manageHostData/setReservationStatusRefunded";

interface BookingInteraface {
  id: number;
  bookingId?: number;
  guestName?: string;
  guestEmail?: string;
  guestProfile?: string;
  hotelName?: string;
  hotelImage?: string;
  roomNumber?: number;
  checkIn: string;
  checkOut: string;
  numberOfDays?: number;
  paymentStatus: 'pending' | 'success' | 'failed' | 'refund' | 'refunded';
  ReservationStatus: 'pending' | 'active' | 'cancled';
  amountPaid: number;
  reservationsDuration?: number;
  hotel?: {
    hotelName: string;
    images?: { imageUrl: string }[];
  };
  room?: {
    roomNumber: number;
  };
  user?: {
    fullName: string;
    email: string;
    profileImage?: string;
  };
  payment?: {
    id?: number;
    paymentDate: string;
    amount: number;
  };
}
interface ReservationDetailCardProps {
  reservation: BookingInteraface;
  onClose: () => void;
}

export default function ReservationDetailCard({
  reservation,
  onClose,
}: ReservationDetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundSuccess, setRefundSuccess] = useState(false);
  const [localPaymentStatus, setLocalPaymentStatus] = useState(reservation.paymentStatus);

  // Format date from ISO to readable format
  const formatDate = (dateString: string | number | Date): string => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return "N/A";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Map reservation status to display status and color
  const getStatusDetails = (status: string | undefined) => {
    if (!status) {
      return {
        label: "Unknown",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
      };
    }
    
    switch (status.toLowerCase()) {
      case "active":
        return {
          label: "Confirmed",
          bgColor: "bg-green-100",
          textColor: "text-green-800",
        };
      case "pending":
        return {
          label: "Pending",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "cancled": // Keep the typo to match schema
        return {
          label: "Cancelled",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
        };
      default:
        return {
          label: status,
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
        };
    }
  };

  // Close when clicking outside the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  // Handle refund process
  const handleRefund = async () => {
    // Get the payment ID from the reservation
    const paymentId = reservation.payment?.id;
    
    if (!paymentId) {
      alert("Payment ID not found. Cannot process refund.");
      return;
    }
    
    setIsRefunding(true);
    try {
      console.log("Processing refund for payment ID:", paymentId);
      const response = await setReservationStatusRefunded(paymentId);
      
      if (response.success) {
        console.log("Refund processed successfully:", response.data);
        setRefundSuccess(true);
        setLocalPaymentStatus('refunded');
        setTimeout(() => {
          setRefundSuccess(false);
        }, 3000);
      } else {
        console.error("Refund processing failed:", response.message);
        alert(response.message || "Failed to process refund");
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      alert("An error occurred while processing the refund. Please check the console for more details.");
    } finally {
      setIsRefunding(false);
    }
  };

  if (!reservation) return null;

  const statusDetails = getStatusDetails(reservation.ReservationStatus);
  const totalNights = reservation.reservationsDuration || reservation.numberOfDays || 0;
  const perNight = totalNights > 0 ? (reservation.amountPaid / totalNights) : 0;
  
  // Get the hotel image with proper fallbacks
  const hotelImage = reservation.hotel?.images?.[0]?.imageUrl || reservation.hotelImage || "/placeholder.svg";
  
  // Get guest information with fallbacks
  const guestName = reservation.user?.fullName || reservation.guestName || "Guest";
  const guestEmail = reservation.user?.email || reservation.guestEmail || "No email";
  const guestProfile = reservation.user?.profileImage || reservation.guestProfile;
  
  // Get room information with fallbacks
  const roomNumber = reservation.room?.roomNumber || reservation.roomNumber || "N/A";

  // Use the local state for payment status to allow UI updates without reloading
  const currentPaymentStatus = localPaymentStatus || reservation.paymentStatus;

  return (
    <div className="fixed inset-0 backdrop-brightness-60 backdrop-blur-xl bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div
        ref={cardRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Reservation Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Success message */}
          {refundSuccess && (
            <div className="mb-4 bg-green-100 p-4 rounded-md">
              <p className="text-green-800 font-medium">Payment status successfully updated to refunded!</p>
            </div>
          )}
          
          {/* Status banner */}
          <div
            className={`${statusDetails.bgColor} ${statusDetails.textColor} px-4 py-2 rounded-lg mb-6 flex items-center justify-between`}
          >
            <span className="font-medium">
              Reservation {statusDetails.label}
            </span>
            <span className="text-sm">ID: #{reservation.id}</span>
          </div>

          {/* Hotel and room info */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={hotelImage}
                  alt={reservation.hotel?.hotelName || "Hotel"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {reservation.hotel?.hotelName || reservation.hotelName || "Hotel"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-medium">
                    {roomNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price per Night</p>
                  <p className="font-medium">{formatCurrency(perNight)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium">
                    {formatDate(reservation.checkIn)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium">
                    {formatDate(reservation.checkOut)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nights</p>
                  <p className="font-medium">{totalNights}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">
                    {formatCurrency(reservation.amountPaid || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guest information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
              Guest Information
            </h4>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                {guestProfile ? (
                  <img
                    src={guestProfile}
                    alt={guestName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 font-medium">
                    {guestName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2) || "?"}
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {guestName}
                </p>
                <p className="text-sm text-gray-500">
                  {guestEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
              Payment Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">UPI</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Date</p>
                <p className="font-medium">
                  {formatDate(reservation.payment?.paymentDate || reservation.checkIn || "")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <div className="flex items-center gap-2">
                  <p
                    className={`font-medium ${
                      currentPaymentStatus === "success"
                        ? "text-green-600"
                        : currentPaymentStatus === "pending"
                        ? "text-yellow-600"
                        : currentPaymentStatus === "refund"
                        ? "text-orange-600"
                        : currentPaymentStatus === "refunded"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {currentPaymentStatus || "N/A"}
                  </p>
                  
                  {/* Refund button - only show when status is "refund" */}
                  {currentPaymentStatus === "refund" && (
                    <button 
                      onClick={handleRefund}
                      disabled={isRefunding}
                      className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRefunding ? "Processing..." : "Process Refund"}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-medium">
                  {formatCurrency(reservation.amountPaid || reservation.payment?.amount || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200">
              Price Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-600">
                  {formatCurrency(perNight)} × {totalNights} nights
                </p>
                <p className="font-medium">
                  {formatCurrency(reservation.amountPaid || 0)}
                </p>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {formatCurrency(reservation.amountPaid || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              Print Details
            </button>
            
            {/* Full-width refund button for mobile */}
            {currentPaymentStatus === "refund" && (
              <button 
                onClick={handleRefund}
                disabled={isRefunding}
                className="w-full sm:hidden px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRefunding ? "Processing Refund..." : "Process Refund"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
