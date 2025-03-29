import { Heart, Share, Star } from "lucide-react"

type TopSctionPropType = {
    type: string,
    overalRating: number,
    totalReviews: number,
    city: string,
    state: string,
    country: string,

}

const TopSection = ({type,overalRating,city,country,state,totalReviews}:TopSctionPropType) => {
  return (
    <div className="mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{type}</h1>
                <div className="flex sm:items-center gap-2 mt-1 text-sm flex-col sm:flex-row">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>{overalRating}</span>
                  </div>
                  <span className="sm:flex hidden">·</span>
                  <span className="underline hidden sm:flex">{totalReviews} reviews</span>
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
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100">
                  <Heart className="h-4 w-4" />
                  <span className="hidden md:inline">Save</span>
                </button>
              </div>
            </div>
  )
}

export default TopSection
