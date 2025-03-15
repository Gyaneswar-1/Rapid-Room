"use client"

import { useEffect, useState } from "react"
import {
  Heart,
  Share,
  Star,
  Key,
  MessageSquare,
  MapPin,
  Tag,
  MousePointer2,
  SprayCan,
  X,
  ChevronDown,
} from "lucide-react"

import ImageCarousel from "../components/BookingPage/image-carousel"
import Calendar from "../components/BookingPage/Calendar"

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hotelData, setHotelData] = useState<any>(null)
  const [showReviewsModal, setShowReviewsModal] = useState(false)
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(new Date())
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000))
  const [guests, setGuests] = useState(2)

  // Example hotel data structure
  const mockHotelData = {
    id: 1,
    type: "Luxury Villa",
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/c5945f8f-a6a7-46c5-b80c-ed2f0c4f1735.jpeg?im_w=1200",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/6ade3559-4ef8-41fc-88ff-71c5c8138407.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/ce3c7c20-2b20-4cfc-8411-59149df323a2.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/c4096073-21bc-4bd4-a9ce-ce83caa6e38b.jpeg?im_w=1440",
      "https://a0.muscache.com/im/pictures/miso/Hosting-39327758/original/7425d87d-7cf4-458e-9483-3f86c08bba7f.jpeg?im_w=1440",
    ],
    address: {
      city: "Miami",
      street: "Ocean Drive",
      state: "Florida",
      country: "USA",
      longitude: -80.13,
      latitude: 25.7907,
    },
    description:
      "This stunning beachfront villa offers panoramic ocean views and modern luxury amenities. Perfect for a relaxing getaway with family or friends.",
    roomType: "Entire villa",
    perNight: 299,
    cleaningFee: 150,
    host: {
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      hostExperience: 5,
      hostRating: 4.9,
      hostResponseRate: 98,
      profileImage: "/placeholder.svg?height=150&width=150",
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      accuracy: 4.7,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.8,
      value: 4.6,
      parking: 4.5,
    },
    reviews: [
      {
        id: 1,
        author: "Michael R.",
        date: "February 2025",
        content: "Amazing place with stunning views. The host was very responsive and helpful throughout our stay.",
        rating: 5,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 2,
        author: "Jessica T.",
        date: "January 2025",
        content:
          "Beautiful property in a perfect location. Everything was clean and well-maintained. Would definitely stay again!",
        rating: 5,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 3,
        author: "David L.",
        date: "December 2024",
        content: "Great experience overall. The villa was exactly as described and the amenities were top-notch.",
        rating: 4,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 4,
        author: "Emma W.",
        date: "November 2024",
        content:
          "We had a wonderful stay at this villa. The views were incredible and the amenities were perfect. Sarah was an excellent host.",
        rating: 5,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 5,
        author: "Robert K.",
        date: "October 2024",
        content:
          "Fantastic location and beautiful property. Everything was as described and the host was very accommodating.",
        rating: 5,
        avatar: "/placeholder.svg?height=50&width=50",
      },
      {
        id: 6,
        author: "Sophia L.",
        date: "September 2024",
        content:
          "The villa exceeded our expectations. It was clean, spacious, and had all the amenities we needed. Would highly recommend!",
        rating: 5,
        avatar: "/placeholder.svg?height=50&width=50",
      },
    ],
    totalReviews: 256,
    numberOfGuests: 6,
  }

  useEffect(() => {
    // Immediately set the mock data to avoid blank screen
    setHotelData(mockHotelData)

    // Simulate API delay for loading state demonstration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Calculate number of nights
  const calculateNights = () => {
    if (!selectedCheckIn || !selectedCheckOut) return 0
    const diffTime = Math.abs(selectedCheckOut.getTime() - selectedCheckIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()

  // Calculate total price
  const calculateTotal = () => {
    const roomTotal = hotelData.perNight * nights
    const serviceFee = Math.round(roomTotal * 0.15)
    return roomTotal + hotelData.cleaningFee + serviceFee
  }

  // Show loading skeleton only if we don't have data yet
  if (isLoading && !hotelData) {
    return <BookingPageSkeleton />
  }

  // Ensure we have data before rendering
  if (!hotelData) {
    return <div className="container py-8">Loading hotel information...</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-6 px-1 sm:px-10 md:px-26">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{hotelData.type}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span>{hotelData.ratings.overall}</span>
              </div>
              <span>·</span>
              <span className="underline">{hotelData.totalReviews} reviews</span>
              <span>·</span>
              <span>
                {hotelData.address.city}, {hotelData.address.state}, {hotelData.address.country}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Share className="h-4 w-4" />
              <span className="hidden md:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Image Carousel */}
        <ImageCarousel images={hotelData.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full overflow-hidden">
                <img
                  src={hotelData.host.profileImage || "/placeholder.svg"}
                  alt={hotelData.host.fullName}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {hotelData.roomType} hosted by {hotelData.host.fullName}
                </p>
                <p className="text-gray-500">{hotelData.numberOfGuests} guests</p>
              </div>
            </div>

            <div className="py-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-600">{hotelData.description}</p>
            </div>

            {/* Refactored "What guests are saying" section */}
            <div className="py-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Rating highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <SprayCan className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Cleanliness</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.cleanliness}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.cleanliness * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MousePointer2 className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Accuracy</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.accuracy}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.accuracy * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Key className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Check-in</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.checkIn}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.checkIn * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Communication</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.communication}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.communication * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.location}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.location * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Tag className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Value</span>
                      <span className="text-sm text-gray-500">{hotelData.ratings.value}</span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${hotelData.ratings.value * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="py-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-medium">{hotelData.ratings.overall}</span>
                  <span>·</span>
                  <span>{hotelData.totalReviews} reviews</span>
                </div>
              </div>

              <div className="space-y-6">
                {hotelData.reviews.slice(0, 3).map((review: any) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={review.avatar || "/placeholder.svg"}
                          alt={review.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 px-4 py-2 border border-gray-900 rounded-md font-medium hover:bg-gray-50"
                onClick={() => setShowReviewsModal(true)}
              >
                Show all {hotelData.totalReviews} reviews
              </button>
            </div>

            <div className="py-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    <img
                      src={hotelData.host.profileImage || "/placeholder.svg"}
                      alt={hotelData.host.fullName}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{hotelData.host.fullName}</h3>
                  <p className="text-gray-500">Host for {hotelData.host.hostExperience} years</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    <span>
                      {hotelData.host.hostRating} • {hotelData.totalReviews} reviews
                    </span>
                  </div>
                  <p className="mt-2 text-sm">Response rate: {hotelData.host.hostResponseRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Refactored Price Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-bold">${hotelData.perNight}</span>
                    <span className="text-gray-500"> night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    <span>{hotelData.ratings.overall} · </span>
                    <span className="ml-1 underline">{hotelData.totalReviews} reviews</span>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="grid grid-cols-2 divide-x border-b relative">
                    <div
                      className="p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setShowCheckInCalendar(!showCheckInCalendar)
                        setShowCheckOutCalendar(false)
                      }}
                    >
                      <div className="text-xs uppercase font-medium">Check-in</div>
                      <div>{formatDate(selectedCheckIn)}</div>
                    </div>
                    <div
                      className="p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => {
                        setShowCheckOutCalendar(!showCheckOutCalendar)
                        setShowCheckInCalendar(false)
                      }}
                    >
                      <div className="text-xs uppercase font-medium">Checkout</div>
                      <div>{formatDate(selectedCheckOut)}</div>
                    </div>

                    {/* Check-in Calendar Dropdown */}
                    {showCheckInCalendar && (
                      <div className="absolute top-full left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-2 border-b flex justify-between items-center">
                          <h3 className="font-medium">Select check-in date</h3>
                          <button
                            onClick={() => setShowCheckInCalendar(false)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <Calendar
                          selectedDate={selectedCheckIn}
                          onChange={(date) => {
                            setSelectedCheckIn(date)
                            setShowCheckInCalendar(false)
                            // If check-out date is before check-in, adjust it
                            if (selectedCheckOut && date && selectedCheckOut < date) {
                              const newCheckOut = new Date(date)
                              newCheckOut.setDate(date.getDate() + 1)
                              setSelectedCheckOut(newCheckOut)
                            }
                          }}
                          minDate={new Date()}
                        />
                      </div>
                    )}

                    {/* Check-out Calendar Dropdown */}
                    {showCheckOutCalendar && (
                      <div className="absolute top-full left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <div className="p-2 border-b flex justify-between items-center">
                          <h3 className="font-medium">Select checkout date</h3>
                          <button
                            onClick={() => setShowCheckOutCalendar(false)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <Calendar
                          selectedDate={selectedCheckOut}
                          onChange={(date) => {
                            setSelectedCheckOut(date)
                            setShowCheckOutCalendar(false)
                          }}
                          minDate={selectedCheckIn ? new Date(selectedCheckIn.getTime() + 86400000) : new Date()}
                        />
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div
                      className="p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
                      onClick={() => {
                        const dropdown = document.getElementById("guests-dropdown")
                        if (dropdown) {
                          dropdown.classList.toggle("hidden")
                        }
                      }}
                    >
                      <div>
                        <div className="text-xs uppercase font-medium">Guests</div>
                        <div>
                          {guests} {guests === 1 ? "guest" : "guests"}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>

                    {/* Guests Dropdown */}
                    <div
                      id="guests-dropdown"
                      className="absolute top-full left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg hidden"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="font-medium">Adults</div>
                            <div className="text-sm text-gray-500">Ages 13+</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setGuests(Math.max(1, guests - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500"
                              disabled={guests <= 1}
                            >
                              -
                            </button>
                            <span>{guests}</span>
                            <button
                              onClick={() => setGuests(Math.min(hotelData.numberOfGuests, guests + 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500"
                              disabled={guests >= hotelData.numberOfGuests}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          This place has a maximum of {hotelData.numberOfGuests} guests.
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            className="text-sm font-medium underline"
                            onClick={() => {
                              const dropdown = document.getElementById("guests-dropdown")
                              if (dropdown) {
                                dropdown.classList.add("hidden")
                              }
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full mb-4 bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-lg font-medium">
                  Reserve
                </button>

                <div className="text-center text-sm">You won't be charged yet</div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="underline">
                      ${hotelData.perNight} x {nights} nights
                    </span>
                    <span>${hotelData.perNight * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>${hotelData.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>${Math.round(hotelData.perNight * nights * 0.15)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t font-semibold">
                    <span>Total before taxes</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reviews Modal */}
      {showReviewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold">All Reviews ({hotelData.totalReviews})</h2>
              <button onClick={() => setShowReviewsModal(false)} className="p-2 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 fill-current text-yellow-500" />
                    <span className="text-xl font-semibold">{hotelData.ratings.overall}</span>
                    <span>·</span>
                    <span className="text-xl font-semibold">{hotelData.totalReviews} reviews</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Cleanliness</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.cleanliness * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.cleanliness}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Accuracy</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.accuracy * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.accuracy}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Check-in</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.checkIn * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.checkIn}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Communication</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.communication * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.communication}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Location</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.location * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.location}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="w-24 text-sm">Value</span>
                      <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div
                          className="h-1 bg-gray-700 rounded-full"
                          style={{ width: `${hotelData.ratings.value * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{hotelData.ratings.value}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {hotelData.reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.author}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "fill-current text-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BookingPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="h-10 w-2/3 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-5 w-1/2 bg-gray-200 rounded-md mb-6"></div>

        <div className="h-96 w-full bg-gray-200 rounded-lg mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-6"></div>
              <div className="h-24 w-full bg-gray-200 rounded-md"></div>
            </div>
            <div>
              <div className="h-8 w-1/2 bg-gray-200 rounded-md mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 w-full bg-gray-200 rounded-md"></div>
                    <div className="h-12 w-full bg-gray-200 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-96 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

