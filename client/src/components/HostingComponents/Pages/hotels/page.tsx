

import { useState } from "react"
import HostSidebar from "@/components/host/host-sidebar"
import HostHeader from "@/components/host/host-header"
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"

export default function HotelsPage() {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [hotelToDelete, setHotelToDelete] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedHotelDetails, setSelectedHotelDetails] = useState<any | null>(null)

  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Mock data for hotels
  const hotels = [
    {
      id: "HTL-1001",
      name: "Sunset Beach Resort",
      location: "Bali, Indonesia",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.8,
      reviews: 124,
      price: 120,
      status: "active",
      bookings: 18,
      earnings: 8640,
      description:
        "A beautiful beachfront resort with stunning sunset views. Features include private beach access, infinity pool, and spa services.",
      rooms: 12,
      amenities: ["Pool", "Spa", "Restaurant", "Beach Access", "Free WiFi", "Air Conditioning"],
    },
    {
      id: "HTL-1002",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.6,
      reviews: 98,
      price: 150,
      status: "active",
      bookings: 12,
      earnings: 7200,
      description:
        "Cozy mountain lodge with panoramic views. Perfect for ski trips and hiking adventures. Features include fireplace, hot tub, and ski storage.",
      rooms: 8,
      amenities: ["Hot Tub", "Fireplace", "Ski Storage", "Mountain Views", "Free WiFi", "Parking"],
    },
    {
      id: "HTL-1003",
      name: "City Center Suites",
      location: "Paris, France",
      image: "/placeholder.svg?height=120&width=200",
      rating: 4.5,
      reviews: 76,
      price: 180,
      status: "active",
      bookings: 8,
      earnings: 5760,
      description:
        "Elegant suites in the heart of Paris. Walking distance to major attractions, restaurants, and shopping districts.",
      rooms: 10,
      amenities: ["City Views", "Room Service", "Concierge", "Free WiFi", "Air Conditioning", "Mini Bar"],
    },
  ]

  // Mock data for room details
  const roomsData = {
    "HTL-1001": [
      {
        id: "RM-101",
        name: "Deluxe Ocean View",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 120,
        status: "occupied",
        guest: "Emily Johnson",
        checkIn: "2023-06-15",
        checkOut: "2023-06-20",
      },
      {
        id: "RM-102",
        name: "Premium Ocean View",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 140,
        status: "occupied",
        guest: "David Wilson",
        checkIn: "2023-06-10",
        checkOut: "2023-06-14",
      },
      {
        id: "RM-103",
        name: "Standard Room",
        type: "Double",
        beds: 2,
        bathrooms: 1,
        maxGuests: 4,
        price: 100,
        status: "available",
      },
      {
        id: "RM-104",
        name: "Family Suite",
        type: "Suite",
        beds: 3,
        bathrooms: 2,
        maxGuests: 6,
        price: 200,
        status: "available",
      },
    ],
    "HTL-1002": [
      {
        id: "RM-201",
        name: "Mountain View Suite",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 150,
        status: "occupied",
        guest: "Michael Smith",
        checkIn: "2023-06-18",
        checkOut: "2023-06-22",
      },
      {
        id: "RM-202",
        name: "Deluxe Mountain View",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 170,
        status: "available",
      },
    ],
    "HTL-1003": [
      {
        id: "RM-301",
        name: "City View Suite",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 180,
        status: "occupied",
        guest: "Jessica Brown",
        checkIn: "2023-06-20",
        checkOut: "2023-06-25",
      },
      {
        id: "RM-302",
        name: "Deluxe City View",
        type: "Suite",
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        price: 200,
        status: "available",
      },
    ],
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleViewDetails = (hotelId: string) => {
    // Find the hotel
    const hotel = hotels.find((h) => h.id === hotelId)
    if (hotel) {
      setSelectedHotelDetails(hotel)
    }
  }

  const handleDeleteClick = (hotelId: string) => {
    setHotelToDelete(hotelId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    console.log(`Deleting hotel: ${hotelToDelete}`)
    // Here you would make an API call to delete the hotel
    setShowDeleteModal(false)
    setHotelToDelete(null)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <HostSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader
          hostName={hostData.name}
          hostAvatar={hostData.avatar}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title and Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Hotels</h1>
                <p className="text-gray-600 mt-1">Manage all your property listings</p>
              </div>
              <button
                onClick={() => router.push("/host/hotels/add")}
                className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Hotel
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-xs w-full mb-4 sm:mb-0">
                  <input
                    type="text"
                    placeholder="Search hotels..."
                    className="block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <FunnelIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-2 ${viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-2 ${viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 10h16M4 14h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hotels Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              hotel.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {hotel.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>

                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-amber-500">
                            <StarIcon className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                          </div>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-sm text-gray-600">{hotel.reviews} reviews</span>
                        </div>

                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <span className="text-lg font-bold text-gray-900">{formatCurrency(hotel.price)}</span>
                            <span className="text-sm text-gray-600"> / night</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">{hotel.bookings}</span> bookings
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-sm text-gray-600">Earnings: </span>
                              <span className="font-medium text-gray-900">{formatCurrency(hotel.earnings)}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => router.push(`/host/hotels/edit/${hotel.id}`)}
                                className="p-1.5 text-teal-600 hover:text-teal-900 hover:bg-primary rounded-md transition-colors"
                              >
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleViewDetails(hotel.id)}
                                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                              >
                                <EyeIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(hotel.id)}
                                className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Hotels List View */}
              {viewMode === "list" && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Hotel
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Rating
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
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
                          Earnings
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
                      {hotels.map((hotel) => (
                        <tr key={hotel.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-16 rounded overflow-hidden">
                                <img
                                  src={hotel.image || "/placeholder.svg"}
                                  alt={hotel.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                                <div className="text-xs text-gray-500">{hotel.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(hotel.price)}</div>
                            <div className="text-xs text-gray-500">per night</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-amber-500" />
                              <span className="ml-1 text-sm text-gray-900">{hotel.rating}</span>
                              <span className="ml-1 text-xs text-gray-500">({hotel.reviews})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                hotel.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {hotel.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.bookings}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(hotel.earnings)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => router.push(`/host/hotels/edit/${hotel.id}`)}
                                className="text-teal-600 hover:text-teal-900"
                              >
                                <PencilIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleViewDetails(hotel.id)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                <EyeIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(hotel.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="p-6 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{hotels.length}</span>{" "}
                  of <span className="font-medium">{hotels.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Previous
                  </button>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                    <ChevronRightIcon className="h-5 w-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Hotel Details Modal */}
      {selectedHotelDetails && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedHotelDetails.name} - Room Details
                      </h3>
                      <button
                        onClick={() => setSelectedHotelDetails(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Hotel Overview */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex-shrink-0 h-32 w-48 rounded overflow-hidden mb-4 md:mb-0 md:mr-6">
                          <img
                            src={selectedHotelDetails.image || "/placeholder.svg"}
                            alt={selectedHotelDetails.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900">{selectedHotelDetails.name}</h4>
                          <p className="text-gray-600">{selectedHotelDetails.location}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">Total Rooms</p>
                              <p className="text-lg font-medium text-gray-900">
                                {roomsData[selectedHotelDetails.id]?.length || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Occupied</p>
                              <p className="text-lg font-medium text-teal-600">
                                {roomsData[selectedHotelDetails.id]?.filter((room) => room.status === "occupied")
                                  .length || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Available</p>
                              <p className="text-lg font-medium text-green-600">
                                {roomsData[selectedHotelDetails.id]?.filter((room) => room.status === "available")
                                  .length || 0}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Occupancy Rate</p>
                              <p className="text-lg font-medium text-gray-900">
                                {roomsData[selectedHotelDetails.id]
                                  ? Math.round(
                                      (roomsData[selectedHotelDetails.id].filter((room) => room.status === "occupied")
                                        .length /
                                        roomsData[selectedHotelDetails.id].length) *
                                        100,
                                    )
                                  : 0}
                                %
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room List */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-medium text-gray-900">All Rooms</h4>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 text-xs bg-primary text-teal-700 rounded-full">All</button>
                          <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full">
                            Occupied
                          </button>
                          <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-full">
                            Available
                          </button>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Room
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Type
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Beds
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Bathrooms
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Max Guests
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>
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
                                  Check-in
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Check-out
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {roomsData[selectedHotelDetails.id]?.map((room) => (
                                <tr key={room.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {room.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.type}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.beds}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.bathrooms}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.maxGuests}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatCurrency(room.price)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        room.status === "occupied"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {room.status === "occupied" ? "Occupied" : "Available"}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.guest || "-"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.checkIn ? formatDate(room.checkIn) : "-"}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {room.checkOut ? formatDate(room.checkOut) : "-"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Hotel</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this hotel? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

