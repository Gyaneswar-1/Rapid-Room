import { Star, X } from "lucide-react";

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

type typeAllReview = {
  totalReviews: number;
  overall: number;
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  value: number;
  location: number;
  reviews: Review[];
};

const AllReviews = ({
  accuracy,
  checkIn,
  cleanliness,
  communication,
  location,
  overall,
  totalReviews,
  value,
  reviews,
}: typeAllReview) => {

  const { showAllReview } = useSelector((state: RootState) => state.toogleAllReviewsReducer);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="fixed inset-0  bg-black/40 shadow-xl backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            All Reviews ({totalReviews})
          </h2>
          <button
            onClick={() => {
              dispatch(toogleAllReviews(showAllReview))
            }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <span className="text-xl font-semibold">{overall}</span>
                <span>·</span>
                <span className="text-xl font-semibold">
                  {totalReviews} reviews
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Cleanliness</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{
                        width: `${cleanliness * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{cleanliness}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Accuracy</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{
                        width: `${accuracy * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{accuracy}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Check-in</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{
                        width: `${checkIn * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{checkIn}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Communication</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{
                        width: `${communication * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{communication}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Location</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{
                        width: `${location * 20}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm">{location}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm">Value</span>
                  <div className="flex-1 h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-1 bg-gray-700 rounded-full"
                      style={{ width: `${value * 20}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">{value}</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
