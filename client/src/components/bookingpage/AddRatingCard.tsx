import type React from "react"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Key, MapPin, MessageSquare, MousePointer2, SprayCan, Tag, Car, Star, X } from "lucide-react"
import { addReview } from "../../service/review/addReview"
import { notifyError, notifySuccess } from "../../lib/Toast"

type RatingFormData = {
  hotelId: number
  reviewComment: string
  cleanlinessRating: number
  accuracyRating: number
  checkInRating: number
  communicationRating: number
  locationRating: number
  priceRating: number
  parkingRating: number
}

interface AddRatingCardProps {
  hotelId: number,
  setShowAddHotelCard:()=>void
}

const AddRatingCard = ({ hotelId, setShowAddHotelCard }: AddRatingCardProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    control, 
    handleSubmit, 
    setValue, 
    formState: { errors }, 
    watch 
  } = useForm<RatingFormData>({
    defaultValues: {
      hotelId,
      reviewComment: "",
      cleanlinessRating: 0,
      accuracyRating: 0,
      checkInRating: 0,
      communicationRating: 0,
      locationRating: 0,
      priceRating: 0,
      parkingRating: 0,
    }
  });

  const handleRatingChange = (field: keyof Omit<RatingFormData, "hotelId" | "reviewComment">, value: number) => {
    setValue(field, value);
  }

  const onSubmit = async (data: RatingFormData) => {
    try {
      setIsSubmitting(true);
      
      // Calculate average rating from all categories
      const ratings = [
        data.cleanlinessRating,
        data.accuracyRating,
        data.checkInRating,
        data.communicationRating,
        data.locationRating,
        data.priceRating,
        data.parkingRating
      ];
      
      const validRatings = ratings.filter(r => r > 0);
      const avgRating = validRatings.length > 0 
        ? validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length 
        : 0;
      
      const reviewData = {
        hotelId: data.hotelId.toString(),
        comment: data.reviewComment,
        rating: avgRating,
        // Include individual ratings
        ratingDetails: {
          cleanliness: data.cleanlinessRating,
          accuracy: data.accuracyRating,
          checkIn: data.checkInRating,
          communication: data.communicationRating,
          location: data.locationRating,
          price: data.priceRating,
          parking: data.parkingRating
        }
      };
      
      const response = await addReview(reviewData);
      
      if (response.success) {
        notifySuccess("Review submitted successfully!");
        setShowAddHotelCard();
      } else {
        notifyError(response.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      notifyError("An error occurred while submitting your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  const StarRating = ({
    value,
    onChange,
    label,
    icon,
  }: {
    value: number
    onChange: (value: number) => void
    label: string
    icon: React.ReactNode
  }) => {
    return (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-gray-100">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium">{label}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => onChange(star)} className="focus:outline-none">
                  <Star className={`h-5 w-5 ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setShowAddHotelCard()}
          disabled={isSubmitting}
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Rate Your Stay</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <Controller
                name="reviewComment"
                control={control}
                rules={{ required: "Please share your experience" }}
                render={({ field }) => (
                  <textarea
                    id="reviewComment"
                    rows={4}
                    className={`w-full px-3 py-2 border ${errors.reviewComment ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400`}
                    placeholder="Share your experience..."
                    {...field}
                    required
                  />
                )}
              />
              {errors.reviewComment && (
                <p className="mt-1 text-sm text-red-500">{errors.reviewComment.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
              <StarRating
                value={watch("cleanlinessRating")}
                onChange={(value) => handleRatingChange("cleanlinessRating", value)}
                label="Cleanliness"
                icon={<SprayCan className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("accuracyRating")}
                onChange={(value) => handleRatingChange("accuracyRating", value)}
                label="Accuracy"
                icon={<MousePointer2 className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("checkInRating")}
                onChange={(value) => handleRatingChange("checkInRating", value)}
                label="Check-in"
                icon={<Key className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("communicationRating")}
                onChange={(value) => handleRatingChange("communicationRating", value)}
                label="Communication"
                icon={<MessageSquare className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("locationRating")}
                onChange={(value) => handleRatingChange("locationRating", value)}
                label="Location"
                icon={<MapPin className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("priceRating")}
                onChange={(value) => handleRatingChange("priceRating", value)}
                label="Value"
                icon={<Tag className="h-5 w-5 text-gray-700" />}
              />

              <StarRating
                value={watch("parkingRating")}
                onChange={(value) => handleRatingChange("parkingRating", value)}
                label="Parking"
                icon={<Car className="h-5 w-5 text-gray-700" />}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRatingCard
