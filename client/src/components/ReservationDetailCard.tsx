import { useEffect, useRef } from "react";

interface BookingInteraface {
  bookingId: number;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  guestEmail: string;
  guestName: string;
  guestProfile: string; // URL to profile image
  numberOfDays: number;
  paymentStatus: string;
  roomNumber: number;
  hotelImage:string;
  hotelName:string;
}

interface ReservationDetailCardProps {
  reservation: BookingInteraface | null;
  onClose: () => void;
}

export default function ReservationDetailCard({
  reservation,
  onClose,
}: ReservationDetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
  const getStatusDetails = (status: string) => {
    switch (status) {
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
      case "cancled":
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

  if (!reservation) return null;

  const statusDetails = getStatusDetails(reservation.paymentStatus);
  const totalNights = reservation.numberOfDays || 0;
  const perNight = 500;

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
          {/* Status banner */}
          <div
            className={`${statusDetails.bgColor} ${statusDetails.textColor} px-4 py-2 rounded-lg mb-6 flex items-center justify-between`}
          >
            <span className="font-medium">
              Reservation {statusDetails.label}
            </span>
            <span className="text-sm">ID: #{reservation.bookingId}</span>
          </div>

          {/* Hotel and room info */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={reservation.hotelImage || "/placeholder.svg"}
                  alt={"Hotel"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {reservation.hotelName}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Room Number</p>
                  <p className="font-medium">
                    {reservation.roomNumber || "N/A"}
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
                    {formatCurrency(500 * totalNights || 0)}
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
                {reservation.guestProfile ? (
                  <img
                    src={reservation.guestProfile || "/placeholder.svg"}
                    alt={reservation.guestName || "Guest"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 font-medium">
                    {reservation.guestName
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
                  {reservation.guestName || "Guest"}
                </p>
                <p className="text-sm text-gray-500">
                  {reservation.guestEmail || "No email"}
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
                  {formatDate(reservation.checkIn || "")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p
                  className={`font-medium ${
                    reservation.paymentStatus === "success"
                      ? "text-green-600"
                      : reservation.paymentStatus === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {reservation.paymentStatus || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-medium">
                  {formatCurrency(500 * totalNights || 0)}
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
                  {formatCurrency(perNight * totalNights)}
                </p>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {formatCurrency(500 * totalNights || 0)}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
