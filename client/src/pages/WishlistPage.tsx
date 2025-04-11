import { useState, useEffect } from "react"
import { Heart, Star, MapPin, X, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { getWishlists } from "../service/wishlist/getWishlists"

interface HotelInterface {
  id: number;
  hotelId: number;
  userId: number;
  hotel: {
    hotelName: string;
    address: {
      city: string;
      country: string;
    };
    images: { imageUrl: string }[]; // Array of objects with an imageUrl property
    perNight: number;
    reviews: Array<any>; // Empty array, can be typed further if review structure is known
    _count: {
      reviews: number;
    };
  };
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<HotelInterface[]>();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setIsLoading(true)
        const data = await getWishlists()
        setWishlistItems(data.data)
      } catch (error) {
        console.error("Error fetching wishlist data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlistData()
  }, [])
  console.log(wishlistItems);
  


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">My Wishlist</h1>
            <p className="mt-1 text-sm text-gray-500">
              {wishlistItems?.length} {wishlistItems?.length === 1 ? "hotel" : "hotels"} saved
            </p>
          </div>
          <Link
            to="/hotels"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Browse Hotels
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">Loading your wishlist...</p>
          </div>
        ) : wishlistItems?.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start saving your favorite hotels to plan your next trip.</p>
            <div className="mt-6">
              <Link
                to="/hotels"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Discover Hotels
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems?.map((hotel,index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={hotel.hotel.images[0]?.imageUrl || "/placeholder.svg"}
                    alt={hotel.hotel.hotelName}
                    width={500}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <button
                    // onClick={() => removeFromWishlist(hotel.id)}
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
                      <span className="ml-1 text-sm font-medium">{hotel.hotel.reviews}</span>
                    </div>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{hotel.hotel._count.reviews} reviews</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{hotel.hotel.hotelName}</h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span className="ml-1 text-sm truncate">{hotel.hotel.address.city},{hotel.hotel.address.country}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${hotel.hotel.perNight}</span>
                      <span className="text-sm text-gray-500"> / night</span>
                    </div>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary"
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

