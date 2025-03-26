"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Heart,
  MessageSquare,
  Edit,
  Camera,
  Star,
  Award,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Home,
  X,
  ArrowRight,
  LayoutDashboard,
  Menu,
  ArrowLeft,
  Check,
  PinIcon,
} from "lucide-react";
import { FaHotel, FaUserCircle } from "react-icons/fa";
import { userStoreType } from "../store/reducers/user.reducers";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import SetUserDataToStore from "../service/userdata/SetDataToStore";

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal-info");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const {
    isHost,
    profileImage,
    fullName,
    email,
    phoneNumber,
    govId,
    createdAt,
    country,
    state,
    street,
    city,
    zipCode,
  }: userStoreType = useSelector((state: RootState) => state.userReducer);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Close mobile menu when a tab is selected
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [activeTab]);

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <SetUserDataToStore />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              My Profile
            </h1>
            <button
              className="ml-4 p-2 rounded-lg bg-gray-200 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {!isHost ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center"
              >
                <Award className="w-4 h-4 mr-2" />
                Upgrade to Host
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center"
                onClick={() => navigate("/hosting")}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Switch to Dashboard
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex sm:hidden items-center gap-2 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
            onClick={() => (window.location.href = "/dashboard")}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </motion.button>
          {!isHost && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
            >
              <Award className="w-4 h-4 mr-2" />
              Become Host
            </motion.button>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Left Column - Profile Image and Navigation */}
          <AnimatePresence>
            {(isMobileMenuOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`md:col-span-1 ${
                  isMobileMenuOpen
                    ? "fixed inset-0 z-50 pt-20 px-4 pb-4 bg-gray-900 bg-opacity-50"
                    : "relative z-10"
                } md:static md:block md:bg-transparent md:p-0`}
              >
                <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full object-cover">
                            <FaUserCircle className="w-full h-full object-cover p-1" />
                          </div>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                      <button
                        onClick={handleProfileImageClick}
                        className="absolute bottom-0 right-0 bg-teal-500 text-white p-1.5 rounded-full hover:bg-teal-600 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {fullName || "fullName"}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      Member since{" "}
                      {new Date(createdAt).toLocaleDateString(undefined, {
                        month: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    {isHost && (
                      <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        <FaHotel className="text-teal-600" size={10} />
                        Host
                      </span>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <nav>
                    <ul>
                      <li>
                        <button
                          onClick={() => setActiveTab("personal-info")}
                          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                            activeTab === "personal-info"
                              ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <User
                              className={`w-5 h-5 mr-3 ${
                                activeTab === "personal-info"
                                  ? "text-teal-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium">Personal Info</span>
                          </div>
                          {activeTab === "personal-info" && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("bookings")}
                          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                            activeTab === "bookings"
                              ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <Calendar
                              className={`w-5 h-5 mr-3 ${
                                activeTab === "bookings"
                                  ? "text-teal-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium">My Bookings</span>
                          </div>
                          {activeTab === "bookings" && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("reviews")}
                          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                            activeTab === "reviews"
                              ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <Star
                              className={`w-5 h-5 mr-3 ${
                                activeTab === "reviews"
                                  ? "text-teal-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium">My Reviews</span>
                          </div>
                          {activeTab === "reviews" && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("messages")}
                          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                            activeTab === "messages"
                              ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <MessageSquare
                              className={`w-5 h-5 mr-3 ${
                                activeTab === "messages"
                                  ? "text-teal-500"
                                  : "text-gray-400"
                              }`}
                            />
                            <span className="font-medium">Messages</span>
                          </div>
                          {activeTab === "messages" && (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>

                {/* Close button for mobile only */}
                {isMobileMenuOpen && (
                  <button
                    className="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg md:hidden flex items-center justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Close Menu
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Column - Content */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab + (selectedBooking ? selectedBooking.id : "")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {/* Personal Info Tab */}
              {activeTab === "personal-info" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                      {!isEditing && <Edit className="ml-2 w-4 h-4" />}
                    </motion.button>
                  </div>

                  {isEditing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          defaultValue="United States"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          defaultValue="New York"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          defaultValue="New York City"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          defaultValue="123 Main Street"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          defaultValue="johndoe@upi"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          defaultValue="10001"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg"
                        >
                          Save Changes
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">
                          CONTACT INFORMATION
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <Mail className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="font-medium">
                                {email || "testemail@gmail.com"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                              <Phone className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium">
                                {phoneNumber || "+1 (555) 123-4567"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">
                          ADDRESS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                              <Home className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Street</p>
                              <p className="font-medium">
                                {street || "Street not added"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-5 h-5 text-indigo-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                City, State, Country
                              </p>
                              <p className="font-medium">
                                {city || "unknown"}, {state || "unknown"},{" "}
                                {country || "unknown"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                              <PinIcon className="w-5 h-5 text-teal-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Zipcode</p>
                              <p className="font-medium">
                                {zipCode || "Zip not added"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-3">
                          OTHERS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">GOVID</p>
                              <p className="font-medium">
                                {govId || "not added"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                              <User className="w-5 h-5 text-teal-500" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">UPI ID</p>
                              <p className="font-medium">johndoe@upi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {!isEditing && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        MY WISHLIST
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item) => (
                          <motion.div
                            key={item}
                            whileHover={{ y: -5 }}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                          >
                            <div className="relative">
                              <img
                                src="/placeholder.svg?height=100&width=150"
                                alt="Wishlist item"
                                className="w-full h-24 object-cover"
                              />
                              <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm">
                                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                              </button>
                            </div>
                            <div className="p-2">
                              <h3 className="font-medium text-sm text-gray-800 truncate">
                                {item === 1
                                  ? "Oceanfront Resort"
                                  : item === 2
                                  ? "Mountain View Cabin"
                                  : "Luxury Penthouse"}
                              </h3>
                              <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 text-xs font-medium">
                                    {item === 1
                                      ? "4.9"
                                      : item === 2
                                      ? "4.7"
                                      : "4.8"}
                                  </span>
                                </div>
                                <p className="font-medium text-xs text-teal-600">
                                  $
                                  {item === 1
                                    ? "320"
                                    : item === 2
                                    ? "180"
                                    : "450"}
                                  <span className="text-xs text-gray-500">
                                    /night
                                  </span>
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === "bookings" && !selectedBooking && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      My Bookings
                    </h2>
                    <div className="w-full sm:w-auto">
                      <select className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>All Bookings</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Booking Card 1 */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer"
                      onClick={() =>
                        setSelectedBooking({
                          id: 1,
                          name: "Grand Plaza Hotel",
                          location: "New York, NY",
                          status: "Upcoming",
                          checkIn: "Dec 15, 2023",
                          checkOut: "Dec 20, 2023",
                          guests: "2 Adults",
                          price: "$1,250",
                          roomType: "Deluxe King Room",
                          bookingId: "BK-12345",
                          bookedOn: "Oct 10, 2023",
                          hostName: "Sarah Johnson",
                          hostContact: "sarah@example.com",
                        })
                      }
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src="/placeholder.svg?height=200&width=300"
                            alt="Grand Plaza Hotel"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                  Grand Plaza Hotel
                                </h3>
                                <p className="text-gray-600">New York, NY</p>
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Upcoming
                              </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Check-in
                                </p>
                                <p className="font-medium">Dec 15, 2023</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Check-out
                                </p>
                                <p className="font-medium">Dec 20, 2023</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-500">
                                Total Price
                              </p>
                              <p className="text-lg font-bold text-teal-600">
                                $1,250
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Message host logic
                                }}
                              >
                                Message Host
                              </motion.button>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Booking Card 2 */}
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer"
                      onClick={() =>
                        setSelectedBooking({
                          id: 2,
                          name: "Mountain Retreat",
                          location: "Aspen, CO",
                          status: "Completed",
                          checkIn: "Nov 5, 2023",
                          checkOut: "Nov 10, 2023",
                          guests: "4 Adults",
                          price: "$950",
                          roomType: "Mountain View Suite",
                          bookingId: "BK-12346",
                          bookedOn: "Sep 15, 2023",
                          hostName: "Michael Brown",
                          hostContact: "michael@example.com",
                        })
                      }
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src="/placeholder.svg?height=200&width=300"
                            alt="Mountain Retreat"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                  Mountain Retreat
                                </h3>
                                <p className="text-gray-600">Aspen, CO</p>
                              </div>
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Completed
                              </span>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Check-in
                                </p>
                                <p className="font-medium">Nov 5, 2023</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">
                                  Check-out
                                </p>
                                <p className="font-medium">Nov 10, 2023</p>
                              </div>
                            </div>

                            <div className="mt-4">
                              <p className="text-sm text-gray-500">
                                Total Price
                              </p>
                              <p className="text-lg font-bold text-teal-600">
                                $950
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Message host logic
                                }}
                              >
                                Message Host
                              </motion.button>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Booking Details */}
              {activeTab === "bookings" && selectedBooking && (
                <div>
                  <div className="flex items-center mb-6">
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="mr-3 p-2 rounded-full hover:bg-gray-100"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Booking Details
                    </h2>
                  </div>

                  <div className="mb-6">
                    <img
                      src="/placeholder.svg?height=300&width=800"
                      alt={selectedBooking.name}
                      className="w-full h-48 md:h-64 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <div className="bg-white rounded-xl border p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {selectedBooking.name}
                            </h3>
                            <p className="text-gray-600">
                              {selectedBooking.location}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              selectedBooking.status === "Upcoming"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {selectedBooking.status}
                          </span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-4">
                          <h4 className="font-medium text-gray-800 mb-3">
                            Booking Information
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">
                                {selectedBooking.checkIn}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">
                                {selectedBooking.checkOut}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Guests</p>
                              <p className="font-medium">
                                {selectedBooking.guests}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Room Type</p>
                              <p className="font-medium">
                                {selectedBooking.roomType}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Booking ID
                              </p>
                              <p className="font-medium">
                                {selectedBooking.bookingId}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Booked On</p>
                              <p className="font-medium">
                                {selectedBooking.bookedOn}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                          <h4 className="font-medium text-gray-800 mb-3">
                            Host Information
                          </h4>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                              <span className="font-bold">
                                {selectedBooking.hostName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">
                                {selectedBooking.hostName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {selectedBooking.hostContact}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border p-6">
                        <h4 className="font-medium text-gray-800 mb-3">
                          Property Policies
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                              <Check className="w-3 h-3 text-gray-600" />
                            </div>
                            Check-in time: 3:00 PM - 8:00 PM
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                              <Check className="w-3 h-3 text-gray-600" />
                            </div>
                            Check-out time: 11:00 AM
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                              <Check className="w-3 h-3 text-gray-600" />
                            </div>
                            No smoking, parties or events
                          </li>
                          <li className="flex items-start">
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5">
                              <Check className="w-3 h-3 text-gray-600" />
                            </div>
                            Pets are not allowed
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="md:w-1/3">
                      <div className="bg-white rounded-xl border p-6 sticky top-6">
                        <h4 className="font-medium text-gray-800 mb-4">
                          Price Details
                        </h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <p className="text-gray-600">Room rate</p>
                            <p className="font-medium">
                              $
                              {Number.parseInt(
                                selectedBooking.price.replace(/[^0-9]/g, "")
                              ) * 0.8}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-gray-600">Taxes & fees</p>
                            <p className="font-medium">
                              $
                              {Number.parseInt(
                                selectedBooking.price.replace(/[^0-9]/g, "")
                              ) * 0.2}
                            </p>
                          </div>
                          <div className="border-t border-gray-100 pt-2 mt-2">
                            <div className="flex justify-between font-bold">
                              <p>Total</p>
                              <p className="text-teal-600">
                                {selectedBooking.price}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {selectedBooking.status === "Upcoming" && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                              >
                                Modify Booking
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2.5 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
                              >
                                Cancel Booking
                              </motion.button>
                            </>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2.5 border border-teal-600 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                          >
                            Message Host
                          </motion.button>
                          {selectedBooking.status === "Completed" && (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
                            >
                              Write Review
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      My Reviews
                    </h2>
                    <div className="w-full sm:w-auto">
                      <select className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>All Reviews</option>
                        <option>Recent</option>
                        <option>Highest Rated</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Review Card 1 */}
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <img
                            src="/placeholder.svg?height=150&width=150"
                            alt="Luxury Downtown Apartment"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <h3 className="font-medium text-gray-800 mt-2">
                            Luxury Downtown Apartment
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> New York, NY
                          </p>
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-sm text-gray-500">
                                Reviewed on April 28, 2023
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="text-yellow-400 w-4 h-4 fill-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">
                            Amazing place! The apartment was spotless,
                            beautifully decorated, and in a perfect location.
                            The host was very responsive and accommodating.
                            Would definitely stay here again!
                          </p>

                          <div className="flex gap-2 overflow-x-auto pb-2">
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
                      </div>
                    </div>

                    {/* Review Card 2 */}
                    <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <img
                            src="/placeholder.svg?height=150&width=150"
                            alt="Beachfront Villa"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <h3 className="font-medium text-gray-800 mt-2">
                            Beachfront Villa
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" /> Miami, FL
                          </p>
                        </div>
                        <div className="md:w-3/4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="text-sm text-gray-500">
                                Reviewed on March 15, 2023
                              </p>
                              <div className="flex items-center mt-1">
                                {[...Array(4)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="text-yellow-400 w-4 h-4 fill-yellow-400"
                                  />
                                ))}
                                {[...Array(1)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="text-gray-300 w-4 h-4"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-700">
                            Great location right on the beach! The villa was
                            spacious and comfortable. The only issue was the air
                            conditioning in one of the bedrooms wasn't working
                            properly, but the host was quick to address it.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Messages
                    </h2>
                    <div className="w-full sm:w-auto">
                      <select className="w-full sm:w-auto bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option>All Messages</option>
                        <option>Unread</option>
                        <option>Sent</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl overflow-hidden">
                    {[
                      {
                        id: 1,
                        sender: "Jane Smith",
                        hotel: "Oceanview Resort",
                        message:
                          "Hi there! I'm interested in booking your Oceanview Resort for next month. Is it available from the 15th to the 20th?",
                        date: "2023-11-28T14:30:00",
                        unread: true,
                        isReceived: true,
                      },
                      {
                        id: 2,
                        sender: "You",
                        recipient: "Michael Johnson",
                        hotel: "Mountain Retreat",
                        message:
                          "Thank you for hosting me at Mountain Retreat. I had a wonderful time and will definitely be back!",
                        date: "2023-11-25T09:15:00",
                        unread: false,
                        isReceived: false,
                      },
                      {
                        id: 3,
                        sender: "You",
                        recipient: "Sarah Williams",
                        hotel: "Luxury Downtown Apartment",
                        message:
                          "I have a question about the parking situation at the Luxury Downtown Apartment. Is there a garage or street parking available?",
                        date: "2023-11-22T16:45:00",
                        unread: false,
                        isReceived: false,
                      },
                      {
                        id: 4,
                        sender: "Sarah Williams",
                        hotel: "Luxury Downtown Apartment",
                        message:
                          "Yes, there is a private garage available for guests. The access code will be provided upon check-in.",
                        date: "2023-11-22T17:30:00",
                        unread: false,
                        isReceived: true,
                      },
                    ].map((message, index, array) => (
                      <div key={message.id}>
                        <div
                          className={`p-4 hover:bg-gray-50 transition-colors ${
                            message.unread ? "bg-teal-50" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div
                                className={`w-10 h-10 rounded-full ${
                                  message.isReceived
                                    ? "bg-teal-100 text-teal-600"
                                    : "bg-blue-100 text-blue-600"
                                } flex items-center justify-center mr-3`}
                              >
                                <span className="font-bold">
                                  {message.isReceived
                                    ? message.sender.charAt(0)
                                    : "Y"}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="font-bold text-gray-800">
                                    {message.isReceived
                                      ? message.sender
                                      : `You → ${message.recipient}`}
                                  </h3>
                                  {message.unread && (
                                    <span className="ml-2 w-2 h-2 bg-teal-600 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  Re: {message.hotel}
                                </p>
                                <p className="mt-1 text-gray-700">
                                  {message.message}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-xs text-gray-500">
                                {new Date(message.date).toLocaleDateString(
                                  undefined,
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                              <div className="mt-2 flex">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-5 h-5" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < array.length - 1 && (
                          <div className="border-t border-gray-100"></div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      New Message
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
