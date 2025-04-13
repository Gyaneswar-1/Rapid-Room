

import { useState } from "react"

import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Star, Mail, Phone, Calendar } from "lucide-react"

export default function GuestsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedGuest, setSelectedGuest] = useState<any>(null)

  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock data for guests
  const guests = [
    {
      id: "G-1001",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBookings: 3,
      totalSpent: 1250,
      lastStay: "2023-05-15",
      nextStay: "2023-07-10",
      rating: 4.8,
      notes: "Prefers quiet rooms away from elevator. Allergic to feather pillows.",
      bookingHistory: [
        {
          id: "BKG-1001",
          hotel: "Sunset Beach Resort",
          room: "Deluxe Ocean View",
          checkIn: "2023-01-15",
          checkOut: "2023-01-20",
          amount: 600,
          status: "completed",
        },
        {
          id: "BKG-1002",
          hotel: "Mountain View Lodge",
          room: "Premium King Room",
          checkIn: "2023-03-10",
          checkOut: "2023-03-15",
          amount: 650,
          status: "completed",
        },
        {
          id: "BKG-1003",
          hotel: "Sunset Beach Resort",
          room: "Family Suite",
          checkIn: "2023-07-10",
          checkOut: "2023-07-15",
          amount: 850,
          status: "upcoming",
        },
      ],
    },
    {
      id: "G-1002",
      name: "Michael Smith",
      email: "michael.smith@example.com",
      phone: "+1 (555) 987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBookings: 2,
      totalSpent: 980,
      lastStay: "2023-04-20",
      nextStay: "2023-08-05",
      rating: 4.5,
      notes: "Business traveler. Prefers early check-in when available.",
      bookingHistory: [
        {
          id: "BKG-2001",
          hotel: "City Center Suites",
          room: "Executive Suite",
          checkIn: "2023-02-10",
          checkOut: "2023-02-12",
          amount: 380,
          status: "completed",
        },
        {
          id: "BKG-2002",
          hotel: "City Center Suites",
          room: "Executive Suite",
          checkIn: "2023-04-18",
          checkOut: "2023-04-20",
          amount: 380,
          status: "completed",
        },
        {
          id: "BKG-2003",
          hotel: "Mountain View Lodge",
          room: "Deluxe Mountain View",
          checkIn: "2023-08-05",
          checkOut: "2023-08-10",
          amount: 750,
          status: "upcoming",
        },
      ],
    },
    {
      id: "G-1003",
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      phone: "+1 (555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBookings: 1,
      totalSpent: 1200,
      lastStay: null,
      nextStay: "2023-06-20",
      rating: null,
      notes: "First-time guest. Celebrating anniversary.",
      bookingHistory: [
        {
          id: "BKG-3001",
          hotel: "Sunset Beach Resort",
          room: "Honeymoon Suite",
          checkIn: "2023-06-20",
          checkOut: "2023-06-25",
          amount: 1200,
          status: "upcoming",
        },
      ],
    },
    {
      id: "G-1004",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 789-0123",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBookings: 4,
      totalSpent: 2100,
      lastStay: "2023-05-28",
      nextStay: null,
      rating: 4.9,
      notes: "Repeat guest. Always leaves the room in excellent condition.",
      bookingHistory: [
        {
          id: "BKG-4001",
          hotel: "Lakeside Cabin",
          room: "Waterfront Cabin",
          checkIn: "2022-12-10",
          checkOut: "2022-12-15",
          amount: 550,
          status: "completed",
        },
        {
          id: "BKG-4002",
          hotel: "Mountain View Lodge",
          room: "Standard Double Room",
          checkIn: "2023-02-20",
          checkOut: "2023-02-25",
          amount: 500,
          status: "completed",
        },
        {
          id: "BKG-4003",
          hotel: "City Center Suites",
          room: "Deluxe King Room",
          checkIn: "2023-04-15",
          checkOut: "2023-04-18",
          amount: 450,
          status: "completed",
        },
        {
          id: "BKG-4004",
          hotel: "Sunset Beach Resort",
          room: "Premium Ocean View",
          checkIn: "2023-05-25",
          checkOut: "2023-05-28",
          amount: 600,
          status: "completed",
        },
      ],
    },
    {
      id: "G-1005",
      name: "Sarah Martinez",
      email: "sarah.martinez@example.com",
      phone: "+1 (555) 234-5678",
      avatar: "/placeholder.svg?height=40&width=40",
      totalBookings: 2,
      totalSpent: 1100,
      lastStay: "2023-03-05",
      nextStay: "2023-07-15",
      rating: 4.7,
      notes: "Prefers rooms with a view. Interested in local activities and tours.",
      bookingHistory: [
        {
          id: "BKG-5001",
          hotel: "Mountain View Lodge",
          room: "Ski Lodge Suite",
          checkIn: "2023-03-01",
          checkOut: "2023-03-05",
          amount: 550,
          status: "completed",
        },
        {
          id: "BKG-5002",
          hotel: "Lakeside Cabin",
          room: "Family Cabin",
          checkIn: "2023-07-15",
          checkOut: "2023-07-20",
          amount: 650,
          status: "upcoming",
        },
      ],
    },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const handleViewGuest = (guest: any) => {
    setSelectedGuest(guest)
  }

  const closeGuestDetails = () => {
    setSelectedGuest(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Guests</h1>
                <p className="text-gray-600 mt-1">Manage and view information about your guests</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search guests..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Guest
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Bookings
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Stay
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Next Stay
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Spent
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Rating
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={guest.avatar || "/placeholder.svg"}
                                alt={guest.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                              <div className="text-xs text-gray-500">{guest.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{guest.email}</div>
                          <div className="text-sm text-gray-500">{guest.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{guest.totalBookings}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(guest.lastStay)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(guest.nextStay)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(guest.totalSpent)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {guest.rating ? (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-900">{guest.rating}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleViewGuest(guest)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">{guests.length}</span> of{" "}
                      <span className="font-medium">{guests.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </a>
                      <a
                        href="#"
                        aria-current="page"
                        className="z-10 bg-primary border-teal-500 text-teal-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      >
                        1
                      </a>
                      <a
                        href="#"
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Guest Details Sidebar */}
      {selectedGuest && (
        <div className="fixed inset-0 overflow-hidden z-40">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Guest Details</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          onClick={closeGuestDetails}
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-4 sm:px-6">
                    <div className="space-y-6">
                      {/* Guest Profile */}
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full overflow-hidden">
                          <img
                            src={selectedGuest.avatar || "/placeholder.svg"}
                            alt={selectedGuest.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{selectedGuest.name}</h3>
                          <p className="text-sm text-gray-500">{selectedGuest.id}</p>
                          {selectedGuest.rating && (
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-700">{selectedGuest.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{selectedGuest.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-700">{selectedGuest.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Booking Summary */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Booking Summary</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Total Bookings</p>
                            <p className="text-lg font-medium text-gray-900">{selectedGuest.totalBookings}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Total Spent</p>
                            <p className="text-lg font-medium text-gray-900">
                              {formatCurrency(selectedGuest.totalSpent)}
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Last Stay</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(selectedGuest.lastStay)}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-xs text-gray-500">Next Stay</p>
                            <p className="text-sm font-medium text-gray-900">{formatDate(selectedGuest.nextStay)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      {selectedGuest.notes && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                            <p className="text-sm text-gray-700">{selectedGuest.notes}</p>
                          </div>
                        </div>
                      )}

                      {/* Booking History */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Booking History</h4>
                        <div className="space-y-3">
                          {selectedGuest.bookingHistory.map((booking: any) => (
                            <div key={booking.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{booking.hotel}</p>
                                  <p className="text-xs text-gray-500">{booking.room}</p>
                                </div>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    booking.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-teal-100 text-teal-800"
                                  }`}
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </div>
                              <div className="mt-2 flex items-center text-xs text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                              </div>
                              <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  {formatCurrency(booking.amount)}
                                </span>
                                <button className="text-xs text-teal-600 hover:text-teal-900">View Details</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-200 pt-4 flex space-x-3">
                        <button className="flex-1 bg-primary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                          Contact Guest
                        </button>
                        <button className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

