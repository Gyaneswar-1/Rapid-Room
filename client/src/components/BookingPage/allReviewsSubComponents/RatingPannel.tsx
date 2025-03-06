import { CiShoppingTag } from "react-icons/ci"
import { IoKeyOutline } from "react-icons/io5"
import { LuMousePointerBan} from "react-icons/lu"
import { TfiSpray } from "react-icons/tfi"
import { TiMessage } from "react-icons/ti"
import left from "../../../assets/images/left.avif"
import right from "../../../assets/images/right.avif"
import { FaCarSide } from "react-icons/fa6";

type ratingPropType = {
  overalRating: number;
  cleanlinessRating: number;
  accuracyRating: number;
  checkInRating: number;
  communicationRating: number;
  locationRating: number;
  valueRating: number;
  parkingRating: number;
};

const RatingPannel = ({
  overalRating,
  cleanlinessRating,
  accuracyRating,
  checkInRating,
  communicationRating,
  locationRating,
  valueRating,
  parkingRating,
}:ratingPropType) => {
  return (
   <>
   <div className="pt1 w-full   md:py-6 py-4  flex flex-col gap-2 items-center md:px-8">
             <div className="topsection">
               <div className="rating flex items-top  justify-center">
                 <img
                   className="h-32"
                   src={left}
                   alt=""
                 />
                 <h1 className="font-bold text-6xl">{overalRating}</h1>
                 <img
                   className="h-32"
                   src={right}
                   alt=""
                 />
               </div>
               <div className="texts flex flex-col gap-2   text-center">
                 <div className="title text-2xl font-bold">Guest favourite</div>
                 <div className="content text-lg font-thin">
                   This home is a guest favourite based on ratings, reviews and
                   reliability
                 </div>
               </div>
             </div>
             <div className="reviewouter w-full h-96 hidden md:block relative overflow-hidden">
   
             <div className="revews max-h-full  w-full hidden md:block sticky top-0 overflow-y-scroll">
               <div className="ovralrating flex flex-col gap-2">
                 <h1 className="text-sm font-bold">Overal rating</h1>
                 <ul>
                   
                   <li className="flex items-center gap-2">
                     <span>5</span>
                     <div className="h-1 w-full relative bg-gray-300">
                       <div className="absolute left-0 top-0 w-4/5 h-1 bg-black"></div>
                     </div>
                   </li>
                   <li className="flex items-center gap-2">
                     <span>4</span>
                     <div className="h-1 w-full relative bg-gray-300">
                       <div className="absolute left-0 top-0 w-2/5 h-1 bg-black"></div>
                     </div>
                   </li>
                   <li className="flex items-center gap-2">
                     <span>3</span>
                     <div className="h-1 w-full relative bg-gray-300">
                       <div className="absolute left-0 top-0 w-3/5 h-1 bg-black"></div>
                     </div>
                   </li>
                   <li className="flex items-center gap-2">
                     <span>2</span>
                     <div className="h-1 w-full relative bg-gray-300">
                       <div className="absolute left-0 top-0 w-2/5 h-1 bg-black"></div>
                     </div>
                   </li>
                   <li className="flex items-center gap-2">
                     <span>1</span>
                     <div className="h-1 w-full relative bg-gray-300">
                       <div className="absolute left-0 top-0 w-1/5 h-1 bg-black"></div>
                     </div>
                   </li>
                 </ul>
               </div>
               <div className="spceficrating">
                 <ul>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <TfiSpray className="text-2xl" />
                       <h1 className="font-bold">Cleanliness</h1>
                     </div>
                     <div className="rating font-bold">{cleanlinessRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <LuMousePointerBan className="text-2xl" />
                       <h1 className="font-bold">Accuracy</h1>
                     </div>
                     <div className="rating font-bold">{accuracyRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <IoKeyOutline className="text-2xl" />
                       <h1 className="font-bold">Check-in</h1>
                     </div>
                     <div className="rating font-bold">{checkInRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <TiMessage className="text-2xl" />
                       <h1 className="font-bold">Communication</h1>
                     </div>
                     <div className="rating font-bold">{communicationRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <CiShoppingTag className="text-2xl" />
                       <h1 className="font-bold">Value</h1>
                     </div>
                     <div className="rating font-bold">{valueRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <FaCarSide className="text-2xl" />
                       <h1 className="font-bold">Location</h1>
                     </div>
                     <div className="rating font-bold">{locationRating}</div>
                   </li>
                   <li className="w-full h-12 md:pr-2 border-b border-b-gray-300 flex justify-between items-center py-2">
                     <div className="category flex items-center gap-2">
                       <FaCarSide className="text-2xl" />
                       <h1 className="font-bold">Parking</h1>
                     </div>
                     <div className="rating font-bold">{parkingRating}</div>
                   </li>
                   
                 </ul>
               </div>
             </div>
             </div>
           </div>
   </>
  )
}

export default RatingPannel
