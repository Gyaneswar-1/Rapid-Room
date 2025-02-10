import { RxCross1 } from "react-icons/rx";
import RatingPannel from "./allReviewsSubComponents/RatingPannel";
import ReviewsPannel from "./allReviewsSubComponents/ReviewsPannel";



export default function AllReviews({onclick}:any) {
  
  return (
    <div className="allreview h-screen fixed  w-screen top-0 mt-0 z-50  flex items-center justify-center md:bg-opacity-100 md:backdrop-brightness-90 md:backdrop-blur-[3px] ">
      <div className="  reviewWidow grid md:grid-cols-3 grid-cols-1 relative md:gap-2 w-full h-full md:h-9/11 md:w-7/11 overflow-hidden md:rounded-xl  bg-white  opacity-100 md:shadow-2xl md:shadow-black">
        <button
          className="absolute top-5 left-5"
          onClick={() => {
            onclick();
          }}
        >
          <RxCross1 className=" text-2xl font-thin" />
        </button>
        <RatingPannel></RatingPannel>
        <ReviewsPannel></ReviewsPannel>
      </div>
    </div>
  );
}

