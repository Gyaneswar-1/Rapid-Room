import { Heart, Share, Star } from "lucide-react";
import { addWishlist } from "../../service/wishlist/addWishlist";
import { useParams, useSearchParams } from "react-router-dom";
import { removeWishlist } from "../../service/wishlist/removeWishlist";
import { notifyError, notifySuccess } from "../../lib/Toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toogleIsWishListed } from "../../store/reducers/singleHotel.reducer";

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
  const dispatch = useDispatch();
  const handleWishlist = async (set:boolean) =>{
    try {
      if(!set){
        //add this hotel to the wishlist
        if (hotelId) {
          const res = await addWishlist(parseInt(hotelId));
          if(res.success === true){
            notifySuccess("Hotel added to wishlist");
            //update the state for efficient rendering
            dispatch(toogleIsWishListed(false))
            return;
          }
        } else {
          notifyError("Adding to wishlist failed");
          return;
        }
      }else{
        //remove this hotel towish list
        if(hotelId){
          const res = await removeWishlist(parseInt(hotelId));
          if(res.success === true){
            notifySuccess("Successfylly remove from wishlist");
            //update to  state for efficient rendering
            dispatch(toogleIsWishListed(true))
            return;
          }
        }else{
          notifyError("Removing from wishlist failed");
          return;
        }
      }
    } catch (error) {
      console.log(error);
      notifyError("Wishlist operation failed")
      return;
      
    }
  }
  
  return (
    <div className="mb-6 flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {type}
        </h1>
        <div className="flex sm:items-center gap-2 mt-1 text-sm flex-col sm:flex-row">
          
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>{overalRating}</span>
            </div>
          
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
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
        onClick={()=>{
          navigator.clipboard.writeText(window.location.href)
  .then(() => {
    notifySuccess("Link copied successfully")
  })
  .catch(err => {
    notifySuccess("Failed to copy the link")
  });
        }}
        >
          <Share className="h-4 w-4" />
          <span className="hidden md:inline">Share</span>
        </button>

        {isWishlisted ? (
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" onClick={()=>{
            handleWishlist(isWishlisted)
          }} >
            <Heart className="h-5 w-5 fill-red-600 border-red-600 outline-red-600 text-red-600" />
            <span className="hidden md:inline">Saved</span>
          </button>
        ) : (
          <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100" onClick={()=>{
            handleWishlist(isWishlisted);
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
