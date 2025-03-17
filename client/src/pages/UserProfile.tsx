"use client"

import { useState } from "react"
import { FaUser, FaCalendarAlt, FaCheckCircle, FaHotel, FaMedal, FaStar } from "react-icons/fa"
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function UserProfile() {
  // const [isHost, setIsHost] = useState(true)
  const [isHost, ] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - User Profile Card */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Cover Image */}
              <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-400">
                <img src="" alt="" />
              </div>

              {/* Profile Info */}
              <div className="px-6 pb-6 relative">
                {/* Profile Image */}
                <div className="relative -mt-16 mb-4">
                  <img
                    className="w-32 h-32 rounded-full border-4 border-white object-cover mx-auto shadow-md"
                    src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQgAgPpQ3XkIvdohs4895lMgXWc2otUhvFp07duEkuDxrPzZ84uos0qsCyF1PnCS6MY6D7glQrO_smPV5zb9ip5gA"
                    alt="User profile"
                  />

                  {/* Online Status Indicator */}
                  <div className="absolute bottom-1 right-1/3 transform translate-x-4">
                    <span className="flex h-4 w-4">
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      </span>
                    </span>
                  </div>
                </div>

                {/* User Badge */}
                <div className="absolute top-4 right-4">
                  {isHost ? (
                    <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                      <FaHotel className="text-teal-600" />
                      Host
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                      <FaUser className="text-purple-600" />
                      Guest
                    </span>
                  )}
                </div>

                {/* User Details */}
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                  <p className="text-gray-600">@johndoe</p>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-gray-500 text-sm">Bookings</p>
                    <p className="font-semibold text-gray-800">24</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Reviews</p>
                    <p className="font-semibold text-gray-800">18</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Rating</p>
                    <p className="font-semibold text-gray-800 flex items-center justify-center">
                      4.8 <FaStar className="text-yellow-400 ml-1" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <FaMedal className="text-teal-500 text-xl" />
                <h2 className="text-lg font-semibold text-gray-800">Membership</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="font-medium text-gray-800">January 2022</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">Verification</p>
                    <p className="font-medium text-gray-800">Identity verified</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaStar className="text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-gray-800">Premium Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - User Details */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600">
                Hi there! I'm John, an avid traveler and food enthusiast. I've been exploring different cities and
                staying at unique accommodations for over 5 years. I enjoy meeting new people and experiencing local
                cultures.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MdLocationOn className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-800">New York, USA</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdEmail className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">john.doe@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MdPhone className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-500 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Response time</p>
                    <p className="font-medium text-gray-800">Within 24 hours</p>
                  </div>

                </div>
                <div className="text-blue-600 underline" onClick={()=>{navigate("/user-account")}}>
                  edit 
                </div>
              </div>
            </div>

            {/* Host Properties Section (Only shown for hosts) */}
            {isHost && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">My Properties</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Property Card 1 */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src="/placeholder.svg?height=160&width=320"
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">Luxury Downtown Apartment</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MdLocationOn className="mr-1" /> Manhattan, NY
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-teal-600">$120/night</p>
                        <p className="text-sm text-gray-500">4.9 (28 reviews)</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Card 2 */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      <img
                        src="/placeholder.svg?height=160&width=320"
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <FaStar className="text-yellow-400" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">Beachfront Villa</h3>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MdLocationOn className="mr-1" /> Miami Beach, FL
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-teal-600">$250/night</p>
                        <p className="text-sm text-gray-500">4.8 (42 reviews)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="mt-4 w-full py-2 bg-teal-50 text-teal-600 rounded-lg font-medium hover:bg-teal-100 transition-colors">
                  View All Properties
                </button>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

              <div className="space-y-4">
                <div className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaHotel className="text-teal-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Booked Oceanview Resort</h3>
                    <p className="text-sm text-gray-500">3 nights · May 15-18, 2023</p>
                    <p className="text-sm text-gray-600 mt-1">Confirmation #BK12345</p>
                  </div>
                </div>

                <div className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaStar className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Left a 5-star review</h3>
                    <p className="text-sm text-gray-500">Mountain Cabin Retreat</p>
                    <p className="text-sm text-gray-600 mt-1">April 28, 2023</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Updated profile information</h3>
                    <p className="text-sm text-gray-600 mt-1">April 15, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

