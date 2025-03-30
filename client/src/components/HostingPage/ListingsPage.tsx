

import { useState } from "react"
import { HiOutlinePlus, HiOutlineLocationMarker, HiOutlineStar } from "react-icons/hi"
import { Link } from "react-router-dom"

// Mock data for listings
const mockListings = [
  {
    id: "1",
    title: "Beachfront Villa",
    location: "Malibu, CA",
    type: "Entire villa",
    rating: 4.9,
    reviews: 128,
    image: "/placeholder.svg?height=200&width=300",
    price: 350,
    isActive: true,
  },
  {
    id: "2",
    title: "Mountain Cabin",
    location: "Aspen, CO",
    type: "Entire cabin",
    rating: 4.8,
    reviews: 95,
    image: "/placeholder.svg?height=200&width=300",
    price: 250,
    isActive: true,
  },
  {
    id: "3",
    title: "Downtown Loft",
    location: "New York, NY",
    type: "Entire loft",
    rating: 4.7,
    reviews: 76,
    image: "/placeholder.svg?height=200&width=300",
    price: 200,
    isActive: false,
  },
  {
    id: "4",
    title: "Lakeside Cottage",
    location: "Lake Tahoe, CA",
    type: "Entire cottage",
    rating: 4.9,
    reviews: 112,
    image: "/placeholder.svg?height=200&width=300",
    price: 280,
    isActive: true,
  },
]

export default function ListingsPage() {
  const [filter, setFilter] = useState("all")

  const filteredListings = mockListings.filter((listing) => {
    if (filter === "all") return true
    if (filter === "active") return listing.isActive
    if (filter === "inactive") return !listing.isActive
    return true
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Your Listings</h1>

        <Link
          to="/add-hotel"
          className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors"
        >
          <HiOutlinePlus className="mr-1.5 h-4 w-4" />
          Create new listing
        </Link>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setFilter("all")}
            className={`${
              filter === "all"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            All ({mockListings.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`${
              filter === "active"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Active ({mockListings.filter((l) => l.isActive).length})
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`${
              filter === "inactive"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Inactive ({mockListings.filter((l) => !l.isActive).length})
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Link to={`/hosting/listings/${listing.id}`} key={listing.id} className="group">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <img src={listing.image || "/placeholder.svg"} alt={listing.title}  className="object-cover" />
                <div
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    listing.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {listing.isActive ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                  {listing.title}
                </h3>

                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <HiOutlineLocationMarker className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span>{listing.location}</span>
                </div>

                <div className="mt-1 text-sm text-gray-500">{listing.type}</div>

                <div className="mt-2 flex items-center">
                  <HiOutlineStar className="h-4 w-4 text-teal-500" />
                  <span className="ml-1 text-sm text-gray-700">{listing.rating}</span>
                  <span className="mx-1 text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">{listing.reviews} reviews</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-900">${listing.price}</span>
                    <span className="text-gray-500"> / night</span>
                  </div>

                  <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

