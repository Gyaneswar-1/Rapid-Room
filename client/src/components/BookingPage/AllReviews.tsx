import { RxCross1 } from "react-icons/rx";
import RatingPannel from "./allReviewsSubComponents/RatingPannel";
import ReviewsPannel from "./allReviewsSubComponents/ReviewsPannel";
import {motion} from "framer-motion"

//state management
import { AppDispatch, RootState } from "../../store/store";
import { toogleAllReviews } from "../../store/reducers/showReviews.reducer";
import { useDispatch, useSelector } from "react-redux";

type allreviewprop = {
  overallRating: number
  totalReviews: number;
  cleanlinessRating: number;
  accuracyRating: number;
  checkInRating: number;
  communicationRating: number;
  locationRating: number;
  valueRating: number;
  parkingRating: number;
};

export default function AllReviews({
  overallRating,
  totalReviews,
  cleanlinessRating,
  accuracyRating,
  checkInRating,
  communicationRating,
  locationRating,
  valueRating,
  parkingRating,
}: allreviewprop) {
  //state management
  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      
    }}
    transition={{
      duration: 0.5
    }}
    whileInView={{
      opacity: 100,
    }}
    
    className="allreview h-screen fixed  w-screen top-0 mt-0 z-50  flex items-center justify-center md:bg-opacity-100 md:backdrop-brightness-90 md:backdrop-blur-[3px] ">
      <div className="  reviewWidow grid md:grid-cols-3 grid-cols-1 relative md:gap-2 w-full h-full md:h-9/11 md:w-7/11 overflow-hidden md:rounded-xl  bg-white  opacity-100 md:shadow-2xl md:shadow-black">
        <button
          className="absolute top-5 left-5"
          onClick={() => {
            dispatch(toogleAllReviews(showAllReview));
          }}
        >
          <RxCross1 className=" text-2xl font-thin" />
        </button>
        <RatingPannel
          overalRating={overallRating}
          accuracyRating={accuracyRating}
          checkInRating={checkInRating}
          cleanlinessRating={cleanlinessRating}
          communicationRating={communicationRating}
          locationRating={ locationRating}
          parkingRating={parkingRating}
          valueRating={valueRating}
        ></RatingPannel>
        <ReviewsPannel totalReviews={totalReviews}></ReviewsPannel>
      </div>
    </motion.div>
  );
}
