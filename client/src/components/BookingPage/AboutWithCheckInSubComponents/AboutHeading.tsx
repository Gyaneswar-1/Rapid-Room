import { FaStar } from "react-icons/fa"
export default function AboutHeading({country,state,roomType,overalRating,totalReviews}:any){
  return (
    <div className="Name flex flex-col gap-1 border-b border-b-gray-300 pb-8">
          <div className="name font-semibold text-2xl tracking-wide">
            {`Room in ${country}, ${state}`}
          </div>
          <div className="type tracking-wide font-medium text-lg ">
            {roomType}
          </div>
          <div className="rating flex items-center gap-1 font-semibold tracking-wide">
            <FaStar />
            {overalRating} <span className="underline"> {`${totalReviews} reviews`}</span>
          </div>
        </div>
  )
}
