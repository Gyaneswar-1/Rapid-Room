import { FaStar } from "react-icons/fa";
type meetHostTypeCardProp = {
  hostImage: string,
  hostName: string,
  totalReveiws: number,
  hostRating: number,
  hostExperienceYear: number,
}

export default function MeetHostCard({hostImage, hostName, totalReveiws, hostRating, hostExperienceYear}:meetHostTypeCardProp){
  return(
    <div className="hostcard flex md:justify-evenly justify-around items-center rounded-2xl md:py-12 py-4 shadow-2xl">
            <div className="pt1 flex flex-col items-center gap-1">
              <img
                src={hostImage?hostImage:"https://tse3.mm.bing.net/th?id=OIP.02eZAVpnIViQOA6eJJO0VgHaF-&pid=Api&P=0&h=180"}
                alt=""
                className="md:h-32 md:w-32 h-28 w-28  rounded-full object-center object-cover"
              />
              <div className="texts">
                <div className="name text-lg font-bold">{hostName}</div>
                <div className="tag text-lg font-semibold">super host</div>
              </div>
            </div>
            <div className="pt2 w-1/3">
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300 w-full ">
                <div className="num text-lg font-bold">{totalReveiws}</div>
                <div className="text text-sm font-bold">Reviews</div>
              </div>
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300 w-full ">
                <div className="num text-lg font-bold flex items-center gap-2">
                  {hostRating}
                  <FaStar className="text-sm" />
                  
                </div>
                <div className="text text-sm font-bold">Rating</div>
              </div>
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300  0 w-full">
                <div className="num text-lg font-bold">{hostExperienceYear}</div>
                <div className="text text-sm font-bold">Years hosting</div>
              </div>
            </div>
          </div>
  )
}