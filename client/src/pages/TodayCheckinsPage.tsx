import { useState, useEffect } from "react"
import ReservationDetailCard from "../components/ReservationDetailCard"
import { getTodayCheckins } from "../service/manageHostData/getTodayCheckins"

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
  hotelImage:string
  hotelName:string,
}

export default function TodayCheckinsPage() {
  const [reservations, setReservations] = useState<BookingInteraface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<BookingInteraface | null>(null)

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true)
      try {
        const response = await getTodayCheckins()
        console.log(response);
        if (response.success) {
          const todayCheckins = filterTodayCheckins(response.data || [])
          setReservations(todayCheckins)
          setError("")
        } else {
          setError("Failed to fetch reservations")
          setReservations([])
        }
      } catch (err) {
        console.error("Error fetching reservations:", err)
        setError("An error occurred while fetching reservations")
        setReservations([])
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  // Filter reservations for today's check-ins
  const filterTodayCheckins = (allReservations: BookingInteraface[]) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return allReservations.filter((reservation) => {
      if (!reservation.checkIn) return false

      const checkInDate = new Date(reservation.checkIn)
      checkInDate.setHours(0, 0, 0, 0)

      return checkInDate.getTime() === today.getTime()
    })
  }

  // Format date from ISO to readable format
  const formatDate = (dateString: string | number | Date): string => {
      try {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      } catch (e) {
        console.error("Date formatting error:", e)
        return "N/A"
      }
    }

  // Format time only
  const formatTime = (dateString: string | number | Date) => {
    try {
      if (!dateString) return "N/A"
      const date = new Date(dateString)
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (e) {
      console.error("Time formatting error:", e)
      return "N/A"
    }
  }

  // Generate initials from full name
  const getInitials = (name: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Handle view reservation details
  const handleViewReservation = (reservation: BookingInteraface) => {
    setSelectedReservation(reservation)
  }

  // Close reservation detail card
  const handleCloseDetailCard = () => {
    setSelectedReservation(null)
  }

  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Get today's date in readable format
  const getTodayDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mt-2">Today's Check-ins</h1>
              <p className="text-gray-500 mt-1">
                {getTodayDate()} • Current time: {getCurrentTime()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2" onClick={()=>{
                location.reload()
              }}>
                Refresh
              </button>
            </div>
          </div>

          {/* Check-ins Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Expected Check-ins Today</h3>
                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {reservations.length} Guest{reservations.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">Loading today's check-ins...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-500">
                  <p>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-teal-600 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : reservations.length > 0 ? (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.bookingId}
                      className="flex flex-col md:flex-row justify-between gap-4 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Guest and room info */}
                      <div className="flex items-center gap-4 min-w-[250px]">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex-shrink-0">
                          {reservation.guestProfile ? (
                            <img
                              src={reservation.guestProfile || "/placeholder.svg"}
                              alt={reservation.guestName || "Guest"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 font-medium">
                              {getInitials(reservation.guestName || "")}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{reservation.guestName || "Guest"}</div>
                          <div className="text-sm text-gray-500">{reservation.guestEmail || "No email"}</div>
                          
                        </div>
                      </div>

                      {/* Check-in details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:flex-1 mt-3 md:mt-0">
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Check-out Date</div>
                          <div className="text-sm font-medium">{formatDate(reservation.checkOut)}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Nights</div>
                          <div className="text-sm font-medium">{reservation.numberOfDays || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Payment Status</div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              reservation.paymentStatus === "success"
                                ? "bg-green-100 text-green-800"
                                : reservation.paymentStatus === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reservation.paymentStatus === "success"
                              ? "Paid"
                              : reservation.paymentStatus === "pending"
                                ? "Pending"
                                : reservation.paymentStatus || "Unknown"}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-3 md:mt-0 self-end md:self-center">
                        <button
                          onClick={() => handleViewReservation(reservation)}
                          className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          View Details
                        </button>
                        {/* <button className="px-3 py-1.5 text-xs font-medium bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                          Check In
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No check-ins today</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no guests scheduled to check in today.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Check-in Tips</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-medium text-teal-800 mb-1">Verify ID</h4>
                <p className="text-sm text-teal-700">Always verify guest identification before completing check-in.</p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-medium text-teal-800 mb-1">Collect Payment</h4>
                <p className="text-sm text-teal-700">
                  Ensure all pending payments are collected before providing room access.
                </p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg">
                <h4 className="font-medium text-teal-800 mb-1">Room Readiness</h4>
                <p className="text-sm text-teal-700">Confirm room is clean and ready before assigning to guests.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reservation Detail Card Modal */}
      {selectedReservation && (
        <ReservationDetailCard reservation={selectedReservation} onClose={handleCloseDetailCard} />
      )}
    </div>
  )
}
