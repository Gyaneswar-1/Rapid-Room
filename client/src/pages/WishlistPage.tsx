

import { useState } from "react"
import { Heart, Star, MapPin, X, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "New York, USA",
      rating: 4.8,
      reviews: 243,
      price: 299,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      location: "Miami Beach, USA",
      rating: 4.6,
      reviews: 187,
      price: 349,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Aspen, USA",
      rating: 4.9,
      reviews: 312,
      price: 429,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 4,
      name: "Urban Boutique Hotel",
      location: "San Francisco, USA",
      rating: 4.7,
      reviews: 156,
      price: 279,
      image: "/placeholder.svg?height=300&width=500",
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">My Wishlist</h1>
            <p className="mt-1 text-sm text-gray-500">
              {wishlistItems.length} {wishlistItems.length === 1 ? "hotel" : "hotels"} saved
            </p>
          </div>
          <Link
            to="#"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Browse Hotels
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start saving your favorite hotels to plan your next trip.</p>
            <div className="mt-6">
              <Link
                to="#"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Discover Hotels
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    width={500}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(hotel.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    aria-label="Remove from wishlist"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                    </div>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{hotel.reviews} reviews</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="ml-1 text-sm truncate">{hotel.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${hotel.price}</span>
                      <span className="text-sm text-gray-500"> / night</span>
                    </div>
                    <Link
                      to="#"
                      className="inline-flex items-center text-sm font-medium text-teal-700 hover:text-teal-800"
                    >
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

