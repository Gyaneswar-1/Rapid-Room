"use client"

import { useState } from "react"
import {
  FaUser,
  FaCalendarAlt,
  FaHeart,
  FaStar,
  FaEdit,
  FaMapMarkerAlt,
  FaHotel,
  FaCheckCircle,
  FaCamera,
  FaEllipsisH,
} from "react-icons/fa"
import { MdBookmark, MdLocationOn, MdSettings } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isHost] = useState(true)
  const navigate =  useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
        <button className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <MdSettings className="text-gray-600 text-xl" />
        </button>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="relative">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-400"></div>

                {/* Profile Image */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                      <img
                        className="w-full h-full object-cover"
                        src="/placeholder.svg?height=128&width=128"
                        alt="User profile"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition-colors">
                      <FaCamera />
                    </button>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-500">@johndoe</p>

                {isHost && (
                  <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mt-2">
                    <FaHotel className="text-teal-600" size={10} />
                    Host
                  </span>
                )}

                <div className="flex justify-center gap-4 mt-4">
                  <button
                  onClick={()=>{
                    navigate("/user-account")
                  }}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                     Account
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ul>
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      activeTab === "profile"
                        ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaUser className={activeTab === "profile" ? "text-teal-500" : "text-gray-400"} />
                    <span className="font-medium">Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      activeTab === "bookings"
                        ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaCalendarAlt className={activeTab === "bookings" ? "text-teal-500" : "text-gray-400"} />
                    <span className="font-medium">Bookings</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      activeTab === "reviews"
                        ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaStar className={activeTab === "reviews" ? "text-teal-500" : "text-gray-400"} />
                    <span className="font-medium">Reviews</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                      activeTab === "wishlist"
                        ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FaHeart className={activeTab === "wishlist" ? "text-teal-500" : "text-gray-400"} />
                    <span className="font-medium">Wishlist</span>
                  </button>
                </li>
                {isHost && (
                  <li>
                    <Link
                        to={"/hosting/listings"}
                      className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${
                        activeTab === "properties"
                          ? "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-600 border-l-4 border-teal-500"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FaHotel className={activeTab === "properties" ? "text-teal-500" : "text-gray-400"} />
                      <span className="font-medium">Properties</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="w-full lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                      <button className="text-teal-500 hover:text-teal-700 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <FaEdit />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="John Doe"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Username</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="@johndoe"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="email"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="john.doe@example.com"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="tel"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="+1 (555) 123-4567"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="New York, USA"
                            readOnly
                          />
                        </div>
                      </div>

                      {/* Member Since */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Member Since</label>
                        <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800"
                            value="January 2022"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-6">
                      <label className="block text-xs font-medium text-gray-500 mb-1">About Me</label>
                      <div className="relative block rounded-lg overflow-hidden border border-gray-300 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500 transition-all duration-200">
                        <textarea
                          className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 min-h-[100px]"
                          readOnly
                          value="Hi there! I'm John, an avid traveler and food enthusiast. I've been exploring different cities and staying at unique accommodations for over 5 years. I enjoy meeting new people and experiencing local cultures."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Bookings Stats */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                        <FaCalendarAlt className="text-teal-500 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Total Bookings</p>
                        <p className="text-2xl font-bold text-gray-800">24</p>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Stats */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <FaStar className="text-yellow-500 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Reviews</p>
                        <p className="text-2xl font-bold text-gray-800">18</p>
                      </div>
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <FaCheckCircle className="text-green-500 text-xl" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Verification</p>
                        <p className="text-lg font-medium text-gray-800">Verified</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">My Bookings</h2>
                    <div className="flex items-center gap-3">
                      <select className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>All Bookings</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                      <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        New Booking
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking Cards */}
                <div className="space-y-4">
                  {/* Booking 1 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt="Booking"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                          <MdBookmark className="text-teal-500" />
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">Oceanview Resort & Spa</h3>
                            <p className="text-gray-500 flex items-center mt-1">
                              <MdLocationOn className="mr-1" /> Bali, Indonesia
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            Confirmed
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500">Check-in</p>
                            <p className="font-medium">May 15, 2023</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Check-out</p>
                            <p className="font-medium">May 18, 2023</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Guests</p>
                            <p className="font-medium">2 Adults</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Total</p>
                            <p className="font-medium text-teal-600">$750</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Contact Host
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking 2 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img
                          src="/placeholder.svg?height=200&width=300"
                          alt="Booking"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                          <MdBookmark className="text-teal-500" />
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">Mountain Cabin Retreat</h3>
                            <p className="text-gray-500 flex items-center mt-1">
                              <MdLocationOn className="mr-1" /> Aspen, Colorado
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                            Upcoming
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500">Check-in</p>
                            <p className="font-medium">June 10, 2023</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Check-out</p>
                            <p className="font-medium">June 15, 2023</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Guests</p>
                            <p className="font-medium">4 Adults</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500">Total</p>
                            <p className="font-medium text-teal-600">$1,200</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Contact Host
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">My Reviews</h2>
                    <div className="flex items-center gap-3">
                      <select className="bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>All Reviews</option>
                        <option>Given</option>
                        <option>Received</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {/* Review 1 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src="/placeholder.svg?height=48&width=48"
                          alt="Reviewer"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">Luxury Downtown Apartment</h4>
                          <p className="text-sm text-gray-500">Reviewed on April 28, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600">
                      Amazing place! The apartment was spotless, beautifully decorated, and in a perfect location. The
                      host was very responsive and accommodating. Would definitely stay here again!
                    </p>

                    <div className="mt-4 flex gap-2">
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Review photo"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <img
                        src="/placeholder.svg?height=80&width=80"
                        alt="Review photo"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src="/placeholder.svg?height=48&width=48"
                          alt="Reviewer"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-800">Beachfront Villa</h4>
                          <p className="text-sm text-gray-500">Reviewed on March 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 w-4 h-4" />
                        ))}
                        {[...Array(1)].map((_, i) => (
                          <FaStar key={i} className="text-gray-300 w-4 h-4" />
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-gray-600">
                      Great location right on the beach! The villa was spacious and comfortable. The only issue was the
                      air conditioning in one of the bedrooms wasn't working properly, but the host was quick to address
                      it.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">My Wishlist</h2>
                  </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Wishlist Item 1 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                    <div className="relative h-48">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Wishlist item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-medium">Tropical Paradise Villa</h4>
                        <p className="text-white/80 text-sm flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> Maldives
                        </p>
                      </div>
                      <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full text-red-500">
                        <FaHeart />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">4.9</span>
                          <span className="text-gray-500 text-sm">(128)</span>
                        </div>
                        <p className="font-semibold text-teal-600">$350/night</p>
                      </div>
                      <button className="mt-3 w-full py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                  

                  {/* Wishlist Item 2 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                    <div className="relative h-48">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Wishlist item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-medium">Urban Loft Apartment</h4>
                        <p className="text-white/80 text-sm flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> New York, USA
                        </p>
                      </div>
                      <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full text-red-500">
                        <FaHeart />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">4.7</span>
                          <span className="text-gray-500 text-sm">(95)</span>
                        </div>
                        <p className="font-semibold text-teal-600">$180/night</p>
                      </div>
                      <button className="mt-3 w-full py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Wishlist Item 3 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                    <div className="relative h-48">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Wishlist item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-medium">Mountain Retreat Cabin</h4>
                        <p className="text-white/80 text-sm flex items-center">
                          <FaMapMarkerAlt className="mr-1" /> Colorado, USA
                        </p>
                      </div>
                      <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full text-red-500">
                        <FaHeart />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">4.8</span>
                          <span className="text-gray-500 text-sm">(76)</span>
                        </div>
                        <p className="font-semibold text-teal-600">$220/night</p>
                      </div>
                      <button className="mt-3 w-full py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-12 p-2  flex items-center justify-center" >
                      <button onClick={()=>{navigate("/wishlist")}} className="bg-teal-600 px-3 py-2 rounded-lg text-white cursor-pointer">
                        Show More
                      </button>
                    </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === "properties" && isHost && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">My Properties</h2>
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                      Add New Property
                    </button>
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Property 1 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <FaEllipsisH className="text-gray-500" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">Luxury Downtown Apartment</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MdLocationOn className="mr-1" /> Manhattan, NY
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-teal-600">$120/night</p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">4.9</span>
                          <span className="text-gray-500 text-sm">(28)</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          View Bookings
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Property 2 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <FaEllipsisH className="text-gray-500" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">Beachfront Villa</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MdLocationOn className="mr-1" /> Miami Beach, FL
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-teal-600">$250/night</p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-medium">4.8</span>
                          <span className="text-gray-500 text-sm">(42)</span>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button className="flex-1 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          View Bookings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

