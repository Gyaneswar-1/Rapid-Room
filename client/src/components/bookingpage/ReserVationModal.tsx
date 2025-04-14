import { useState } from "react";
import { X, CalendarIcon, Loader2 } from "lucide-react";
import { AppDispatch, RootState } from "../../store/store";
import { setShowReservModel } from "../../store/reducers/showReservatonModel.reducer";
import { useDispatch, useSelector } from "react-redux";
import { handelReservation } from "../../service/checkin/handelReservation";
import {
  setPaymentId,
  setReservationId,
  setRoomId,
  setHotelIdForCheckIn,
} from "../../store/reducers/checkIn.reducer";
import checkInHandler from "../../service/checkin/checkInService";
import { notifyError, notifySuccess } from "../../lib/Toast";

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
  const { hotelId, reservationId, paymentId, roomId } = useSelector(
    (state: RootState) => state.checkInReducer
  );
  const dispatch: AppDispatch = useDispatch();

  // Initialize dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [selectedCheckIn, setSelectedCheckIn] = useState<Date>(today);
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date>(tomorrow);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [datesSelected, setDatesSelected] = useState(true);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatDateToString = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  const calculateNights = (): number => {
    if (!selectedCheckIn || !selectedCheckOut) return 0;

    const diffTime = selectedCheckOut.getTime() - selectedCheckIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  const calculateTotalCost = (): number => {
    const roomCost = perNightCost * nights;
    return roomCost + cleaningFee + serviceFee;
  };

  const totalCost = calculateTotalCost();

  const handleRequestReservation = async () => {
    if (!datesSelected || isRequestLoading) return;
    setIsRequestLoading(true);

    try {
      const formattedCheckIn = formatDateToString(selectedCheckIn);
      const formattedCheckOut = formatDateToString(selectedCheckOut);

      const response = await handelReservation(
        hotelId,
        formattedCheckIn,
        formattedCheckOut
      );

      if (response?.success) {
        dispatch(setReservationId(response.data.resevationId));
        dispatch(setRoomId(response.data.roomId));
        dispatch(setPaymentId(response.data.paymentId));
        dispatch(setHotelIdForCheckIn(response.data.hotelId));
        setReservationSuccess(true);
        notifySuccess("Reservation successful! Please proceed to payment.");
      } else {
        notifyError("Reservation failed. Please try again.");
      }
    } catch (error) {
      notifyError("Something went wrong. Please try again.");
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!reservationSuccess || isPaymentLoading) return;
    setIsPaymentLoading(true);

    try {
      const response = await checkInHandler({
        amount: totalCost,
        email: "bibekbibek966@gmail.com",
        name: "bibek samal",
        phNumber: 9178240594,
        hotelId,
        reservationId,
        paymentId,
        roomId,
      });

      setPaymentSuccess(true);
      
    } catch (error) {
      notifyError("Payment processing failed. Please try again.");
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleDateChange = (date: string, type: "checkin" | "checkout") => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (type === "checkin") {
      if (selectedDate < currentDate) {
        return;
      }
      setSelectedCheckIn(selectedDate);
      if (selectedCheckOut <= selectedDate) {
        const newCheckOut = new Date(selectedDate);
        newCheckOut.setDate(selectedDate.getDate() + 1);
        setSelectedCheckOut(newCheckOut);
      }
    } else {
      if (selectedDate <= selectedCheckIn) {
        return;
      }
      setSelectedCheckOut(selectedDate);
    }
    setDatesSelected(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 shadow-xl backdrop-blur-md">
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
                      value={formatDateForInput(selectedCheckIn)}
                      min={formatDateForInput(new Date())}
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
                      value={formatDateForInput(selectedCheckOut)}
                      min={formatDateForInput(
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
              <div className="space-y-4 mt-8">
                {!reservationSuccess && (
                  <button
                    onClick={handleRequestReservation}
                    disabled={!datesSelected || isRequestLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                      !datesSelected || isRequestLoading
                        ? "bg-gray-200 text-gray-500"
                        : "bg-primary text-white"
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
                )}

                {reservationSuccess && !paymentSuccess && (
                  <button
                    onClick={handlePayment}
                    disabled={isPaymentLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                      isPaymentLoading
                        ? "bg-gray-200 text-gray-500"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isPaymentLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      "Complete Payment"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
