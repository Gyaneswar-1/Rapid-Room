"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Edit, Heart, Calendar, Menu, X, ChevronRight, Home, Settings, List, Clock } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

export default function ProfilePage() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // User profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "rapidroom@gmail.com",
    phone: "+1 (555) 123-4567",
    street: "225 Kukura",
    city: "Cuttack",
    state: "Odisha",
    country: "India",
    zipcode: "",
    govId: "",
    upiId: "johndoe@upi",
    profileImage: "/placeholder.svg?height=200&width=200",
  })

  // Mock data for wishlist
  const [wishlist, setWishlist] = useState([
    {
      id: "wish1",
      name: "Sunset Beach Resort",
      location: "Bali, Indonesia",
      price: "$120/night",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "wish2",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      price: "$150/night",
      image: "/placeholder.svg?height=100&width=150",
    },
  ])

  // Mock data for recent bookings (showing only 2 for the main page)
  const [recentBookings, setRecentBookings] = useState([
    {
      id: "BKG-1001",
      hotelName: "Oceanview Villa",
      location: "Maldives",
      checkIn: "2023-04-15",
      checkOut: "2023-04-20",
      amount: "$850",
      status: "completed",
      paymentStatus: "paid",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "BKG-1002",
      hotelName: "City Center Suites",
      location: "New York",
      checkIn: "2023-05-10",
      checkOut: "2023-05-15",
      amount: "$720",
      status: "upcoming",
      paymentStatus: "paid",
      image: "/placeholder.svg?height=100&width=150",
    },
  ])

  // Handle profile image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfile({
            ...profile,
            profileImage: event.target.result as string,
          })
        }
      }

      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     <Navbar show={false} />

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/profile/bookings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Bookings
            </Link>
            <Link
              to="/profile/edit"
              className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 hover:text-teal-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Edit Profile
            </Link>
            <Link
              to="/profile/wishlist"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Wishlist
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Logout
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Profile Overview */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6 mt-20">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow">
                  <img
                    src={profile.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-teal-600 p-1.5 rounded-full text-white hover:bg-teal-700 transition-colors"
                >
                  <Edit className="h-3 w-3" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600">{profile.email}</p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Link>
                  <Link
                    to="/profile/bookings"
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <List className="h-4 w-4 mr-1" />
                    My Bookings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">UPI ID</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.upiId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Address</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Street</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.street}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">City</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.city}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">State</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.state}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Country</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.country}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Zipcode</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.zipcode || "Not added"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">GOVID</h3>
                    <p className="mt-1 text-sm text-gray-900">{profile.govId || "Not added"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
                <Link
                  to="/profile/bookings"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="divide-y divide-gray-200">
                {recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="p-6">
                      <div className="flex flex-col sm:flex-row">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                          <div className="w-full sm:w-24 h-16 rounded-md overflow-hidden">
                            <img
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.hotelName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{booking.hotelName}</h3>
                              <p className="text-sm text-gray-500">{booking.location}</p>

                              <div className="mt-1 flex items-center text-xs text-gray-500">
                                <Calendar className="flex-shrink-0 mr-1 h-3 w-3 text-gray-400" />
                                <span>
                                  {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end">
                              <p className="text-sm font-medium text-gray-900">{booking.amount}</p>

                              <div className="mt-1 flex flex-wrap gap-2">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    booking.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "upcoming"
                                        ? "bg-teal-100 text-teal-800"
                                        : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>

                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    booking.paymentStatus === "paid"
                                      ? "bg-green-100 text-green-800"
                                      : booking.paymentStatus === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <Clock className="mx-auto h-12 w-12 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start exploring properties to book your stay.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* My Wishlist */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-medium text-gray-900">My Wishlist</h2>
                </div>
                <Link
                  to="/profile/wishlist"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="p-6 space-y-4">
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.location}</p>
                        <p className="text-xs font-medium text-gray-900 mt-1">{item.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <Heart className="mx-auto h-10 w-10 text-gray-300" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No saved properties</h3>
                    <p className="mt-1 text-xs text-gray-500">Start saving properties you like.</p>
                  </div>
                )}
                
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white shadow rounded-lg overflow-hidden mb-20">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
              </div>

              <div className="p-6 space-y-4">
                <Link
                  to="/profile/security/password"
                  className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                      <Settings className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Change Password</p>
                      <p className="text-xs text-gray-500">Last updated 3 months ago</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

