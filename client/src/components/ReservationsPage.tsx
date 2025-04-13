"use client"

import { useState, useEffect } from "react"
import { getHostReservations } from "../service/manageHostData/getHostReservations"
import ReservationDetailCard from "../components/ReservationDetailCard"

interface ReservationInterface {
  ReservationStatus: "active" | "pending" | "cancled" | string
  amountPaid: number
  checkIn: string // ISO date string
  checkOut: string // ISO date string
  hotel: {
    hotelName: string
    id: number
    images: {
      imageUrl: string
    }[]
    perNight: number
  }
  id: number
  payment: {
    amount: number
    id: number
    paymentDate: string // ISO date string
    paymentMethod: "UPI" | string // Allowing string for other payment methods
    status: "success" | string // Allowing string for other statuses
  }
  paymentStatus: "success" | "pending" | string
  reservationsDuration: number
  room: {
    id: number
    roomNumber: number
  }
  user: {
    id: number
    fullName: string
    email: string
    profileImage: string
  }
}

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [reservations, setReservations] = useState<ReservationInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<ReservationInterface | null>(null)

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true)
      try {
        const response = await getHostReservations()
        console.log("Reservations data:", response.data)
        if (response.success) {
          setReservations(response.data.reservations || [])
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
  }, [activeTab]) // Refetch when active tab changes

  // Map reservation status to display status
  const mapReservationStatus = (status: string) => {
    switch (status) {
      case "active":
        return "confirmed"
      case "pending":
        return "pending"
      case "cancled":
        return "cancelled"
      default:
        return status
    }
  }

  // Filter reservations based on active tab
  const filteredReservations =
    activeTab === "all"
      ? reservations
      : reservations.filter((r) => mapReservationStatus(r.ReservationStatus) === activeTab)

  // Format date from ISO to readable format
  const formatDate = (dateString: string | number | Date) => {
    try {
      if (!dateString) return "N/A"
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    } catch (e) {
      console.error("Date formatting error:", e)
      return dateString || "N/A"
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
  const handleViewReservation = (reservation: ReservationInterface) => {
    setSelectedReservation(reservation)
  }

  // Close reservation detail card
  const handleCloseDetailCard = () => {
    setSelectedReservation(null)
  }

  // Get formatted reservations for display
  const formattedReservations = filteredReservations.map((reservation) => {
    console.log("Processing reservation:", reservation) // Debug log

    // Get first image if available
    const imageUrl = reservation.hotel?.images?.[0]?.imageUrl || null

    return {
      id: reservation.id || 0,
      guest: {
        name: reservation.user?.fullName || "Guest",
        avatar: reservation.user?.profileImage || null,
        initials: getInitials(reservation.user?.fullName),
      },
      hotel: reservation.hotel?.hotelName || "Hotel",
      room: reservation.room?.roomNumber ? `Room ${reservation.room.roomNumber}` : "Room",
      checkIn: formatDate(reservation.checkIn),
      checkOut: formatDate(reservation.checkOut),
      status: mapReservationStatus(reservation.ReservationStatus || "pending"),
      amount: `$${reservation.amountPaid || reservation.payment?.amount || 0}`,
      guests: reservation.reservationsDuration || 1,
      hotelImage: imageUrl,
      email: reservation.user?.email || "No email",
      originalData: reservation, // Store the original data for the detail view
    }
  })

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Export
              </button>
              <button className="px-3 py-1.5 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Add Reservation
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-4 w-full">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "all"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("confirmed")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "confirmed"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "pending"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "cancelled"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeTab === "all"
                    ? "All Reservations"
                    : activeTab === "confirmed"
                      ? "Confirmed Reservations"
                      : activeTab === "pending"
                        ? "Pending Reservations"
                        : "Cancelled Reservations"}
                </h3>
              </div>

              {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                  <p className="mt-2 text-gray-600">Loading reservations...</p>
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
              ) : formattedReservations.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {formattedReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col md:flex-row justify-between gap-4 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Guest and room info */}
                      <div className="flex items-center gap-4 min-w-[250px]">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex-shrink-0">
                          {reservation.guest.avatar ? (
                            <img
                              src={reservation.guest.avatar || "/placeholder.svg"}
                              alt={reservation.guest.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-600 font-medium">
                              {reservation.guest.initials}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{reservation.guest.name}</div>
                          <div className="text-sm text-gray-500">{reservation.email}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {reservation.hotel} • {reservation.room}
                          </div>
                        </div>
                      </div>

                      {/* Stay details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:flex-1 mt-3 md:mt-0">
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Check-in</div>
                          <div className="text-sm font-medium">{String(reservation.checkIn)}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Check-out</div>
                          <div className="text-sm font-medium">{String(reservation.checkOut)}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Nights</div>
                          <div className="text-sm font-medium">{reservation.guests}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Amount</div>
                          <div className="text-sm font-medium">{reservation.amount}</div>
                        </div>
                        <div>
                          <div className="text-xs uppercase font-medium text-gray-500">Status</div>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              reservation.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : reservation.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reservation.status === "confirmed"
                              ? "Confirmed"
                              : reservation.status === "pending"
                                ? "Pending"
                                : "Cancelled"}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-3 md:mt-0 self-end md:self-center">
                        <button
                          onClick={() => handleViewReservation(reservation.originalData)}
                          className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                          View
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p>No {activeTab} reservations found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination - simplified for now */}
          {formattedReservations.length > 0 && (
            <div className="flex items-center justify-end">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{formattedReservations.length}</span> reservation(s)
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Reservation Detail Card Modal */}
      {selectedReservation && (
        <ReservationDetailCard reservation={selectedReservation} onClose={handleCloseDetailCard} />
      )}
    </div>
  )
}
