import { Star } from "lucide-react";

//state management
import { AppDispatch, RootState } from "../../store/store";
import { toogleAllReviews } from "../../store/reducers/showReviews.reducer";
import { useDispatch, useSelector } from "react-redux";

type Review = {
  id: number;
  author: string;
  date: string;
  content: string;
  rating: number;
  avatar: string;
};

type reviewType = {
  overalRating: number;
  totalReviews: number;
  reviews: Review[];
};

const ReviewSection = ({ overalRating, totalReviews, reviews }: reviewType) => {
  const { showAllReview } = useSelector(
    (state: RootState) => state.toogleAllReviewsReducer
  );
  
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="py-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium">{overalRating}</span>
          <span>·</span>
          <span>{totalReviews} reviews</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, 3).map((review: any) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-base font-semibold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                )}
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
                  className={`h-3 w-3 ${
                    i < review.rating
                      ? "fill-current text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>

      <div className=" flex gap-3">
        <button
          className="mt-6 px-4 py-2 border border-gray-900 rounded-md font-medium hover:bg-gray-50"
          onClick={() => {
            dispatch(toogleAllReviews(showAllReview));
          }}
        >
          Show all {totalReviews} reviews
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
