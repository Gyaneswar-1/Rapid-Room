import { useState, useEffect } from "react";
import { Heart, Star, MapPin, X, ChevronRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getWishlists } from "../service/wishlist/getWishlists";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";

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
    images: { imageUrl: string }[];
    perNight: number;
    reviews: Array<any>;
    _count: {
      reviews: number;
    };
  };
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<HotelInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setIsLoading(true);
        const data = await getWishlists();
        setWishlistItems(data.data);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar show={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">Your saved properties</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow text-center">
            <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring hotels and save your favorites here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
            >
              Explore Hotels <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface WishlistCardProps {
  item: HotelInterface;
}

const WishlistCard = ({ item }: WishlistCardProps) => {
  const navigate = useNavigate();
  const hotel = item.hotel;

  const handleCardClick = () => {
    navigate(`/book-hotel?hotelId=${item.hotelId}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300"
    >
      <div
        className="relative overflow-hidden h-48 w-full group cursor-pointer"
        onClick={handleCardClick}
      >
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={
            hotel.images[0]?.imageUrl ||
            "https://placehold.co/600x400?text=Hotel+Image"
          }
          alt={hotel.hotelName}
          className="w-full h-full object-cover transition-transform duration-300 bg-gray-200"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400?text=Hotel+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{hotel.hotelName}</h3>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="h-4 w-4 text-red-500" />
          <p className="text-sm truncate">
            {hotel.address.city}, {hotel.address.country}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-lg font-semibold text-gray-900">
            ₹{hotel.perNight.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-normal text-gray-600">night</span>
          </p>
        </div>

        <button
          onClick={handleCardClick}
          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};
