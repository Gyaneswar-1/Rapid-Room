import { CiLocationOn } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosKey } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { LuMousePointerBan, LuParkingMeter } from "react-icons/lu";
import { TfiSpray } from "react-icons/tfi";

export default function SpceficRating({cleanlinessRating, accuracyRating, checkInRating, communicationRating, locationRating, valueRating, parkingRating}:any){
  return(
    <div className=" w-full  grid md:grid-cols-7 grid-cols-2 place-items-between">
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Cleanliness</h1>
            <h2 className="text-lg font-semibold">{cleanlinessRating}</h2>
          </div>
          <TfiSpray className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Accuracy</h1>
            <h2 className="text-lg font-semibold">{accuracyRating}</h2>
          </div>
          <LuMousePointerBan className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Check-in</h1>
            <h2 className="text-lg font-semibold">{checkInRating}</h2>
          </div>
          <IoIosKey className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Communication</h1>
            <h2 className="text-lg font-semibold">{communicationRating}</h2>
          </div>
          <FiMessageSquare className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Location</h1>
            <h2 className="text-lg font-semibold">{locationRating}</h2>
          </div>
          <CiLocationOn className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col gap-2 md:gap-6 pl-6 md:m-0 m-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Value</h1>
            <h2 className="text-lg font-semibold">{valueRating}</h2>
          </div>
          <IoPricetagOutline className="text-4xl " />
        </div>
        <div className="box hidden md:flex flex-col gap-6 pl-6">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Parking</h1>
            <h2 className="text-lg font-semibold">{parkingRating}</h2>
          </div>
          <LuParkingMeter className="text-4xl " />
        </div>
      </div>
  )
}