import { Heart, Share, Star } from "lucide-react";
import { addWishlist } from "../../service/wishlist/addWishlist";
import { useParams, useSearchParams } from "react-router-dom";
import { removeWishlist } from "../../service/wishlist/removeWishlist";

type TopSctionPropType = {
  type: string;
  overalRating: number;
  totalReviews: number;
  city: string;
  state: string;
  country: string;
  isWishlisted: boolean;
};

const TopSection = ({
  type,
  overalRating,
  city,
  country,
  state,
  totalReviews,
  isWishlisted,
}: TopSctionPropType) => {

  const {hotelid} = useParams();
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get('hotelId') || hotelid;
  
  const handleWishlist = (set:boolean) =>{
    try {
      if(set){
        addWishlist(hotelId)
      }else{
        removeWishlist(hotelId);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {type}
        </h1>
        <div className="flex sm:items-center gap-2 mt-1 text-sm flex-col sm:flex-row">
          {overalRating === 0 ? (
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>{overalRating}</span>
            </div>
          ) : null}
          <span className="sm:flex hidden">·</span>
          <span className="underline hidden sm:flex">
            {totalReviews} reviews
          </span>
          <span className="sm:flex hidden">·</span>
          <span>
            {city}, {state}, {country}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
          <Share className="h-4 w-4" />
          <span className="hidden md:inline">Share</span>
        </button>

        {isWishlisted ? (
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" onClick={()=>{
            handleWishlist(false)
          }} >
            <Heart className="h-5 w-5 fill-red-600 border-red-600 outline-red-600 text-red-600" />
            <span className="hidden md:inline">Saved</span>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" onClick={()=>{
            handleWishlist(true)
          }} >
            <Heart className="h-5 w-6" />
            <span className="hidden md:inline">Save</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopSection;
