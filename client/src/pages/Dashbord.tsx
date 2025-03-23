import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Calendar,
  Home,
  PlusCircle,
  DollarSign,
  Award,
  Heart,
  MessageSquare,
  HelpCircle,
  Menu,
  X,
  Edit,
  MessageCircle,
  Star,
  XIcon,
} from "lucide-react"

import NavBar from "../components/Navbar/Navbar"
import SetUserDataToStore from "../service/userdata/SetDataToStore";

// Dashboard component
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("account-info")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Navigation items
  const navItems = [
    { id: "account-info", label: "Account Info", icon: <User className="w-5 h-5" /> },
    { id: "my-bookings", label: "My Bookings", icon: <Calendar className="w-5 h-5" /> },
    { id: "hosted-hotels", label: "Hosted Hotels", icon: <Home className="w-5 h-5" /> },
    { id: "add-hotel", label: "Add Hotel", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "my-earnings", label: "My Earnings", icon: <DollarSign className="w-5 h-5" /> },
    { id: "upgrade-to-host", label: "Upgrade to Host", icon: <Award className="w-5 h-5" /> },
    { id: "wishlists", label: "Wishlists", icon: <Heart className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "help-center", label: "Help Center", icon: <HelpCircle className="w-5 h-5" /> },
  ]

  return (
    <>
    <NavBar show={true}></NavBar>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 py-16">
      {/* Mobile Header */}
      <div className="md:hidden bg-teal-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">RapidRoom</h1>
        <button onClick={toggleMobileMenu} className="p-1">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Left Panel - Navigation */}
      <motion.div
        className={`bg-white shadow-lg md:w-64 md:flex md:flex-col md:min-h-screen ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        } z-10 absolute md:relative w-full`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 border-b hidden md:block">
          <h1 className="text-2xl font-bold text-teal-600">RapidRoom</h1>
          <p className="text-gray-500 text-sm">Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <motion.li key={item.id} whileHover={{ x: 5 }}>
                <button
                  onClick={() => {
                    setActiveTab(item.id)
                    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeTab === item.id ? "bg-teal-600 text-white" : "text-gray-700 hover:bg-teal-50"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <span className="font-bold">JD</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            {activeTab === "account-info" && <AccountInfo />}
            {activeTab === "my-bookings" && <MyBookings />}
            {activeTab === "hosted-hotels" && <HostedHotels />}
            {activeTab === "add-hotel" && <AddHotel />}
            {activeTab === "my-earnings" && <MyEarnings />}
            {activeTab === "upgrade-to-host" && <UpgradeToHost />}
            {activeTab === "wishlists" && <Wishlists />}
            {activeTab === "messages" && <Messages />}
            {activeTab === "help-center" && <HelpCenter />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    <SetUserDataToStore></SetUserDataToStore>
    </>
  )
}

// Account Info Component
function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Account Information</h2>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              defaultValue="123 Main Street"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none mb-3"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                defaultValue="New York"
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <input
                type="text"
                defaultValue="NY"
                placeholder="State"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
              <input
                type="text"
                defaultValue="10001"
                placeholder="Zip Code"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              />
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
                <span className="text-4xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-500">Member since 2023</p>
              <div className="mt-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">4.9</span>
                <span className="text-gray-500 text-sm ml-1">(42 reviews)</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-500">CONTACT INFORMATION</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="text-sm font-medium text-gray-500">ADDRESS</h4>
                <p className="mt-2">123 Main Street</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">ACCOUNT DETAILS</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium">Guest</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Methods</p>
                    <p className="font-medium">Visa •••• 4242</p>
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

// My Bookings Component
function MyBookings() {
  const [activeModal, setActiveModal] = useState<any>(null);

  const bookings = [
    {
      id: 1,
      hotelName: "Grand Plaza Hotel",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop",
      checkIn: "2023-12-15",
      checkOut: "2023-12-20",
      price: 1250,
      status: "upcoming",
    },
    {
      id: 2,
      hotelName: "Oceanview Resort",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
      checkIn: "2024-01-10",
      checkOut: "2024-01-15",
      price: 1800,
      status: "upcoming",
    },
    {
      id: 3,
      hotelName: "Mountain Retreat",
      location: "Aspen, CO",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000&auto=format&fit=crop",
      checkIn: "2023-11-05",
      checkOut: "2023-11-10",
      price: 950,
      status: "completed",
    },
  ]

  // Format date to display in a more readable format
  const formatDate = (dateString:any) => {
    const options = { year: "numeric" as const, month: "short" as const, day: "numeric" as const }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking.id}
            whileHover={{ y: -5 }}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img
                  src={booking.image || "/placeholder.svg"}
                  alt={booking.hotelName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{booking.hotelName}</h3>
                      <p className="text-gray-600">{booking.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status === "upcoming" ? "Upcoming" : "Completed"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Check-in</p>
                      <p className="font-medium">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Check-out</p>
                      <p className="font-medium">{formatDate(booking.checkOut)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Total Price</p>
                    <p className="text-lg font-bold text-teal-600">${booking.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {booking.status === "upcoming" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModal({ type: "cancel", booking })}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Booking
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModal({ type: "message", booking })}
                    className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                  >
                    Message Host
                  </motion.button>

                  {booking.status === "completed" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveModal({ type: "review", booking })}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Write Review
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Cancel/Message/Review */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            {activeModal.type === "cancel" && (
              <>
                <h3 className="text-xl font-bold mb-4">Cancel Booking</h3>
                <p className="mb-6">
                  Are you sure you want to cancel your booking at {activeModal.booking.hotelName}? This action cannot be
                  undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setActiveModal(null)} className="px-4 py-2 border rounded-lg">
                    Keep Booking
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Yes, Cancel</button>
                </div>
              </>
            )}

            {activeModal.type === "message" && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Message Host</h3>
                  <button onClick={() => setActiveModal(null)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="mb-4">Send a message to the host of {activeModal.booking.hotelName}</p>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none mb-4"
                  rows={4}
                  placeholder="Type your message here..."
                ></textarea>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Send Message
                  </motion.button>
                </div>
              </>
            )}

            {activeModal.type === "review" && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Write a Review</h3>
                  <button onClick={() => setActiveModal(null)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="mb-4">Share your experience at {activeModal.booking.hotelName}</p>

                <div className="mb-4">
                  <p className="mb-2 font-medium">Rating</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 text-yellow-400 cursor-pointer" />
                    ))}
                  </div>
                </div>

                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none mb-4"
                  rows={4}
                  placeholder="Write your review here..."
                ></textarea>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Submit Review
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}

// Hosted Hotels Component
function HostedHotels() {
  const hotels = [
    {
      id: 1,
      name: "Luxury Downtown Apartment",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      reviews: 24,
      price: 150,
      status: "active",
    },
    {
      id: 2,
      name: "Beachfront Villa",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      reviews: 36,
      price: 280,
      status: "active",
    },
    {
      id: 3,
      name: "Mountain Cabin",
      location: "Denver, CO",
      image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      reviews: 18,
      price: 120,
      status: "inactive",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hosted Hotels</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New Hotel
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            whileHover={{ y: -5 }}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-48">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    hotel.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {hotel.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{hotel.name}</h3>
              <p className="text-gray-600 text-sm">{hotel.location}</p>

              <div className="mt-2 flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium">{hotel.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({hotel.reviews} reviews)</span>
              </div>

              <div className="mt-2">
                <span className="text-lg font-bold text-teal-600">${hotel.price}</span>
                <span className="text-gray-500 text-sm"> / night</span>
              </div>

              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg flex items-center justify-center"
                >
                  <Edit className="mr-2 w-4 h-4" />
                  Edit Hotel
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Add Hotel Component
function AddHotel() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Hotel</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
          <input
            type="text"
            placeholder="Enter hotel name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City, State"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
          <input
            type="number"
            placeholder="$"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Describe your hotel"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none">
            <option value="">Select room type</option>
            <option value="entire_home">Entire Home</option>
            <option value="private_room">Private Room</option>
            <option value="shared_room">Shared Room</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            placeholder="Max number of guests"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <input
            type="number"
            placeholder="Number of bedrooms"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <input
            type="number"
            placeholder="Number of bathrooms"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Wi-Fi", "Kitchen", "Free Parking", "Pool", "Air Conditioning", "Washer & Dryer"].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-600">Drag and drop photos here, or click to select files</p>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">
                Select Files
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Add Hotel
          </motion.button>
        </div>
      </form>
    </div>
  )
}

// My Earnings Component
function MyEarnings() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Earnings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Earnings</h3>
          <p className="text-3xl font-bold text-teal-600 mt-2">$12,450</p>
          <p className="text-green-600 text-sm mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            12% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Bookings</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">48</p>
          <p className="text-green-600 text-sm mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
            8% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Occupancy Rate</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">76%</p>
          <p className="text-red-600 text-sm mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            3% from last month
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Earnings</h3>
        <div className="h-64 flex items-end justify-between">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => {
            // Generate random heights for the bars
            const height = Math.floor(Math.random() * 80) + 20
            return (
              <div key={month} className="flex flex-col items-center">
                <div className="w-8 bg-teal-500 rounded-t-sm" style={{ height: `${height}%` }}></div>
                <p className="text-xs mt-2 text-gray-600">{month}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue by Hotel</h3>
          <div className="space-y-4">
            {[
              { name: "Luxury Downtown Apartment", revenue: 5200 },
              { name: "Beachfront Villa", revenue: 4800 },
              { name: "Mountain Cabin", revenue: 2450 },
            ].map((hotel) => (
              <div key={hotel.name} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{hotel.name}</span>
                    <span className="text-sm font-medium text-teal-600">${hotel.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-teal-600 h-2 rounded-full"
                      style={{ width: `${(hotel.revenue / 5200) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Payouts</h3>
          <div className="space-y-4">
            {[
              { date: "2023-12-15", amount: 850 },
              { date: "2023-12-22", amount: 1200 },
              { date: "2023-12-29", amount: 950 },
            ].map((payout, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">
                    {new Date(payout.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">Scheduled payout</p>
                </div>
                <p className="text-lg font-bold text-teal-600">${payout.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Upgrade to Host Component
function UpgradeToHost() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upgrade to Host</h2>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-teal-100 rounded-full p-3">
            <Award className="w-6 h-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-800">Become a Host</h3>
            <p className="text-gray-600 mt-1">Share your space and earn extra income by hosting on RapidRoom.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            <Home className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">List Your Property</h3>
          <p className="text-gray-600">
            Share details about your space, like how many guests can stay and what amenities you offer.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            <Calendar className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Welcome Guests</h3>
          <p className="text-gray-600">
            Once your listing is live, qualified guests can reach out and book their stay.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
            <DollarSign className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Start Earning</h3>
          <p className="text-gray-600">
            You'll get paid directly to your bank account 24 hours after your guest checks in.
          </p>
        </div>
      </div>

      <form className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Host Application</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none">
              <option value="">Select property type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="hotel">Hotel</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="City, State, Country"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to become a host?</label>
            <textarea
              placeholder="Tell us a bit about yourself and why you want to host..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Verification</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">Upload a photo of your government-issued ID</p>
              <button className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">
                Upload ID
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Information</label>
            <div className="border border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">How would you like to receive payments?</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="payment-method"
                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="bank-transfer" className="ml-2 text-sm text-gray-700">
                    Bank Transfer
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment-method"
                    className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  />
                  <label htmlFor="paypal" className="ml-2 text-sm text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Submit Application
          </motion.button>
        </div>
      </form>
    </div>
  )
}

// Wishlists Component
function Wishlists() {
  const wishlistItems = [
    {
      id: 1,
      name: "Oceanfront Resort",
      location: "Cancun, Mexico",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1000&auto=format&fit=crop",
      price: 320,
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 2,
      name: "Mountain View Cabin",
      location: "Aspen, Colorado",
      image: "https://images.unsplash.com/photo-1518602164578-cd0074062767?q=80&w=1000&auto=format&fit=crop",
      price: 180,
      rating: 4.7,
      reviews: 95,
    },
    {
      id: 3,
      name: "Luxury Penthouse",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1000&auto=format&fit=crop",
      price: 450,
      rating: 4.8,
      reviews: 76,
    },
    {
      id: 4,
      name: "Beachside Bungalow",
      location: "Maui, Hawaii",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop",
      price: 275,
      rating: 4.9,
      reviews: 112,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlists</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-md">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.location}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-teal-600">${item.price}</span>
                  <span className="text-gray-500 text-sm"> / night</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Messages Component
function Messages() {
  const messages = [
    {
      id: 1,
      sender: "Jane Smith",
      hotel: "Oceanview Resort",
      message:
        "Hi there! I'm interested in booking your Oceanview Resort for next month. Is it available from the 15th to the 20th?",
      date: "2023-11-28T14:30:00",
      unread: true,
    },
    {
      id: 2,
      sender: "Michael Johnson",
      hotel: "Mountain Retreat",
      message:
        "Thank you for hosting us at your Mountain Retreat. We had a wonderful time and will definitely be back!",
      date: "2023-11-25T09:15:00",
      unread: false,
    },
    {
      id: 3,
      sender: "Sarah Williams",
      hotel: "Luxury Downtown Apartment",
      message:
        "I have a question about the parking situation at your Luxury Downtown Apartment. Is there a garage or street parking available?",
      date: "2023-11-22T16:45:00",
      unread: false,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString(undefined, { weekday: "long" })
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>

      <div className="bg-white border rounded-xl overflow-hidden">
        {messages.map((message, index) => (
          <div key={message.id}>
            <div className={`p-4 hover:bg-gray-50 transition-colors ${message.unread ? "bg-teal-50" : ""}`}>
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                    <span className="font-bold">{message.sender.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-gray-800">{message.sender}</h3>
                      {message.unread && <span className="ml-2 w-2 h-2 bg-teal-600 rounded-full"></span>}
                    </div>
                    <p className="text-sm text-gray-500">Re: {message.hotel}</p>
                    <p className="mt-1 text-gray-700">{message.message}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                  <div className="mt-2 flex">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <XIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
            {index < messages.length - 1 && <div className="border-t border-gray-100"></div>}
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800">No messages yet</h3>
          <p className="text-gray-500 mt-1">When you receive messages, they'll appear here.</p>
        </div>
      )}
    </div>
  )
}

// Help Center Component
function HelpCenter() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const helpSections = [
    {
      id: "booking",
      title: "Booking a Hotel",
      icon: <Calendar className="w-5 h-5" />,
      questions: [
        {
          question: "How do I book a hotel?",
          answer:
            'To book a hotel, search for your destination, select your dates, and choose a hotel from the search results. Review the details and click "Book Now" to complete your reservation.',
        },
        {
          question: "Can I cancel my booking?",
          answer:
            'Yes, you can cancel your booking through your account dashboard. Go to "My Bookings" and click the "Cancel" button. Please note that cancellation policies vary by hotel.',
        },
        {
          question: "How do I modify my reservation?",
          answer:
            'To modify your reservation, go to "My Bookings" in your account dashboard, find the booking you want to change, and click "Message Host" to request modifications.',
        },
      ],
    },
    {
      id: "hosting",
      title: "Hosting on RapidRoom",
      icon: <Home className="w-5 h-5" />,
      questions: [
        {
          question: "How do I become a host?",
          answer:
            'To become a host, go to "Upgrade to Host" in your dashboard and complete the application form. You\'ll need to provide information about your property and verify your identity.',
        },
        {
          question: "How do I set my pricing?",
          answer:
            "When listing your property, you can set your base price. We recommend researching similar properties in your area to determine competitive pricing. You can adjust your prices at any time.",
        },
        {
          question: "When do I get paid?",
          answer:
            "You'll receive payment 24 hours after your guest checks in. Payments are sent directly to your bank account or preferred payment method.",
        },
      ],
    },
    {
      id: "account",
      title: "Account Management",
      icon: <User className="w-5 h-5" />,
      questions: [
        {
          question: "How do I update my profile information?",
          answer:
            'To update your profile, go to "Account Info" in your dashboard and click the "Edit Profile" button. You can update your personal information, contact details, and address.',
        },
        {
          question: "How do I change my password?",
          answer:
            'To change your password, go to "Account Info" in your dashboard, click "Edit Profile," and select the "Change Password" option.',
        },
        {
          question: "How do I add a payment method?",
          answer:
            'To add a payment method, go to "Account Info" in your dashboard and navigate to the "Payment Methods" section. Click "Add Payment Method" and follow the instructions.',
        },
      ],
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Help Center</h2>

      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 bg-teal-100 rounded-full p-3">
            <HelpCircle className="w-6 h-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-800">Need Help?</h3>
            <p className="text-gray-600 mt-1">
              Find answers to common questions or contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        {helpSections.map((section) => (
          <div key={section.id} className="border-b last:border-b-0">
            <button
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-full mr-3">{section.icon}</div>
                <h3 className="font-bold text-gray-800">{section.title}</h3>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedSection === section.id ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: expandedSection === section.id ? "auto" : 0,
                opacity: expandedSection === section.id ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-4">
                {section.questions.map((item, index) => (
                  <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-800 mb-2">{item.question}</h4>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg inline-flex items-center"
        >
          <MessageCircle className="mr-2 w-5 h-5" />
          Contact Support
        </motion.button>
      </div>
    </div>
  )
}

