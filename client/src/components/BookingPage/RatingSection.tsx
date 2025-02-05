import { CiLocationOn } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosKey } from "react-icons/io";
import { IoPricetagOutline } from "react-icons/io5";
import { LuMousePointerBan, LuParkingMeter } from "react-icons/lu";
import { TfiSpray } from "react-icons/tfi";


export default function RatingSection() {
  return (
    <div className="border-t border-gray-300 py-8 flex flex-col  gap-14">
      <div className="pt1 w-full flex flex-col items-center justify-center  text-center">
        <div className="rating flex items-top ">
          <img
            className="h-42"
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
            alt=""
          />
          <h1 className="font-bold text-8xl">5.0</h1>
          <img
            className="h-42"
            src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
            alt=""
          />
        </div>
        <div className="texts flex flex-col gap-2 md:w-1/4 ">
          <div className="title text-2xl font-bold">Guest favourite</div>
          <div className="content text-lg font-thin">
            This home is a guest favourite based on ratings, reviews and
            reliability
          </div>
        </div>
      </div>
      <div className="pt2 w-full  grid md:grid-cols-7 grid-cols-2 place-items-between">
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Cleanliness</h1>
            <h2 className="text-lg font-semibold">5.0</h2>
          </div>
          <TfiSpray className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Accuracy</h1>
            <h2 className="text-lg font-semibold">5.0</h2>
          </div>
          <LuMousePointerBan className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Check-in</h1>
            <h2 className="text-lg font-semibold">4.9</h2>
          </div>
          <IoIosKey className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Communication</h1>
            <h2 className="text-lg font-semibold">5.0</h2>
          </div>
          <FiMessageSquare className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col md:gap-6 pl-6 md:m-0 m-2 gap-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Location</h1>
            <h2 className="text-lg font-semibold">4.9</h2>
          </div>
          <CiLocationOn className="text-4xl " />
        </div>
        <div className="box md:border-r md:border-r-gray-300 flex flex-col gap-2 md:gap-6 pl-6 md:m-0 m-2">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Value</h1>
            <h2 className="text-lg font-semibold">4.9</h2>
          </div>
          <IoPricetagOutline className="text-4xl " />
        </div>
        <div className="box hidden md:flex flex-col gap-6 pl-6">
          <div className="text flex flex-col gap-">
            <h1 className="text-lg font-semibold">Parking</h1>
            <h2 className="text-lg font-semibold">5.0</h2>
          </div>
          <LuParkingMeter className="text-4xl " />
        </div>
      </div>
    </div>
  );
}