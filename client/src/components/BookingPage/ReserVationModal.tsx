import { useState } from "react";
import { X, CalendarIcon, Loader2 } from "lucide-react";

//state management
import { AppDispatch, RootState } from "../../store/store";
import { setShowReservModel } from "../../store/reducers/showReservatonModel.reducer";
import { useDispatch, useSelector } from "react-redux";

import {
  setPaymentId,
  setReservationId,
  setRoomId,
} from "../../store/reducers/checkIn.reducer";

interface ReservationModalProps {
  perNightCost: number;
  hotelName: string;
  city: string;
  state: string;
  country: string;
  totalRating: number;
  overallRating: number;
  cleaningFee: number;
  serviceFee: number;
  roomType?: string;
}

export default function ReservationModal({
  perNightCost,
  hotelName,
  city,
  state,
  country,
  totalRating,
  overallRating,
  cleaningFee,
  serviceFee,
  roomType = "Standard Room",
}: ReservationModalProps) {
  const { showReservatonModel } = useSelector(
    (state: RootState) => state.toogleShowReseveModelReducer
  );
  const dispatch: AppDispatch = useDispatch();
  // Initialize with current date for check-in
  const today = new Date();

  const { hotelId, reservationId, paymentId, roomId } = useSelector(
    (state: RootState) => state.checkInReducer
  );

  // Initialize with tomorrow for check-out
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [selectedCheckIn, setSelectedCheckIn] = useState<Date>(today);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date>(tomorrow);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [datesSelected, setDatesSelected] = useState(true); // Default to true since we have default dates

  // Add this helper function
  const formatDateToString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Convert string date to Date object
  const parseDateString = (dateStr: string): Date => {
    const [day, month, year] = dateStr
      .split("-")
      .map((num) => parseInt(num, 10));
    return new Date(year, month - 1, day);
  };

  // Calculate nights and total cost
  const calculateNights = (): number => {
    if (!selectedCheckIn || !selectedCheckOut) return 0;

    const diffTime = selectedCheckOut.getTime() - selectedCheckIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  const calculateTotalCost = (): number => {
    const roomCost = perNightCost * nights;
    const serviceCharge = Math.round(roomCost * 0.15); // 15% service charge
    return roomCost + cleaningFee + serviceCharge;
  };

  const totalCost = calculateTotalCost();

  const handleSendOtp = () => {
    if (!email || !email.includes("@")) return;

    setOtpSent(true);
    
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) return;

    // In a real app, you would verify the OTP with your backend
    // For demo purposes, we'll just accept any 4+ digit code
    setOtpVerified(true);
    console.log("OTP verified");
  };

  const handleRequestReservation = () => {
    if (!datesSelected || !otpVerified) return;

    setIsRequestLoading(true);

    // Format dates before logging
    const formattedCheckIn = formatDateToString(selectedCheckIn);
    const formattedCheckOut = formatDateToString(selectedCheckOut);
    console.log(formattedCheckIn, formattedCheckOut);

    // Simulate API call
    setIsRequestLoading(false);
  };

  const handlePayment = () => {
    if (!datesSelected || !otpVerified) return;

    setIsPaymentLoading(true);

    // Log all payment data
    const paymentData = {
      hotel: {
        name: hotelName,
        city,
        state,
        country,
        roomType,
      },
      dates: {
        checkIn: selectedCheckIn,
        checkOut: selectedCheckOut,
        nights,
      },
      costs: {
        perNight: perNightCost,
        cleaningFee,
        serviceFee,
        total: totalCost,
      },
      guest: {
        email,
      },
    };

    console.log("Payment Data:", paymentData);

    // Simulate API call
    setTimeout(() => {
      setIsPaymentLoading(false);
      console.log("Payment processed");
      // You would typically redirect to a payment gateway or show a success message
    }, 2000);
  };

  const handleDateChange = (date: string, type: "checkin" | "checkout") => {
    // Convert HTML date format (YYYY-MM-DD) to our format (DD-MM-YYYY)
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    const selectedDate = parseDateString(formattedDate);
    if (type === "checkin") {
      setSelectedCheckIn(selectedDate);
      // If check-out date is before check-in, adjust it
      if (selectedCheckOut < selectedDate) {
        const newCheckOut = new Date(selectedDate);
        newCheckOut.setDate(selectedDate.getDate() + 1);
        setSelectedCheckOut(newCheckOut);
      }
    } else {
      setSelectedCheckOut(selectedDate);
    }
    setDatesSelected(true);
  };

  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center p-4 bg-black/40 shadow-xl backdrop-blur-md">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">Complete Your Reservation</h2>
          <button
            onClick={() => {
              dispatch(setShowReservModel(!showReservatonModel));
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{hotelName}</h3>
                <p className="text-gray-600">
                  {roomType} in {city}, {state}, {country}
                </p>
                <div className="flex items-center mt-1">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm text-gray-500">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">
                    Rating: {overallRating}/5 ({totalRating} reviews)
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Select Dates</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={formatDateToString(selectedCheckIn)}
                      min={formatDateToString(new Date())}
                      onChange={(e) =>
                        handleDateChange(e.target.value, "checkin")
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={formatDateToString(selectedCheckOut)}
                      min={formatDateToString(
                        new Date(selectedCheckIn.getTime() + 86400000)
                      )}
                      onChange={(e) =>
                        handleDateChange(e.target.value, "checkout")
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      ₹{perNightCost} x {nights} nights
                    </span>
                    <span>₹{perNightCost * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>₹{cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-semibold">
                    <span>Total</span>
                    <span>₹{totalCost}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Verify Your Email
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 px-3 py-2 border rounded-md"
                      />
                      <button
                        onClick={handleSendOtp}
                        disabled={!email || !email.includes("@") || otpVerified}
                        className={`px-3 py-2 rounded-md ${
                          !email || !email.includes("@") || otpVerified
                            ? "bg-gray-200 text-gray-500"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        OTP Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="flex-1 px-3 py-2 border rounded-md"
                        />
                        <button
                          onClick={handleVerifyOtp}
                          disabled={!otp || otp.length < 4 || otpVerified}
                          className={`px-3 py-2 rounded-md ${
                            !otp || otp.length < 4 || otpVerified
                              ? "bg-gray-200 text-gray-500"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          Verify
                        </button>
                      </div>
                      {otpVerified && (
                        <p className="text-green-600 text-sm mt-1">
                          Email verified successfully!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <button
                  onClick={handleRequestReservation}
                  disabled={!datesSelected || !otpVerified || isRequestLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    !datesSelected || !otpVerified
                      ? "bg-gray-200 text-gray-500"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  {isRequestLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Request Reservation"
                  )}
                </button>

                <button
                  onClick={handlePayment}
                  disabled={!datesSelected || !otpVerified || isPaymentLoading}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    !datesSelected || !otpVerified
                      ? "bg-gray-200 text-gray-500"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {isPaymentLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Payment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
