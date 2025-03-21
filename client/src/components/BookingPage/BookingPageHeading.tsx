import { FaChevronLeft, FaShare } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { notifySuccess } from "../../lib/Toast";

type hotelType = {
  hotelType: string,
};

export default function BookingPageHeading({hotelType}:hotelType) {
  return (
    <div className="heading absolute w-full md:relative flex px-4 md:px-0 justify-between py-4 md:py-8 ">
      <div className="mainheading text-2xl tracking-wide font-semibold flex items-center">
        <div className="bg-white p-4 rounded-full md:hidden">
          <FaChevronLeft className=" md:hidden  text-xl " />
        </div>
        <span className="hidden md:block ">
          {hotelType}
        </span>
      </div>
      <div className="btns flex  md:gap-4">
        <div className="btn1 hover:bg-gray-200 px-2  py-1 rounded-lg flex items-center gap-2">
          <div className="bg-white md:bg-transparent  p-4 md:p-0 rounded-full">
            <FaHeart  className=" text-2xl text-rose-500" />
          </div>
          <span className="hidden md:block z-10">Like</span>
        </div>
        <button
        onClick={()=>{
          navigator.clipboard.writeText(window.location.href);
          notifySuccess("Link has been copied")
        }}
        className="btn2 hover:bg-gray-200 px-2  py-1 rounded-lg flex items-center gap-2">
          <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-full">
            <FaShare className=" text-2xl text-teal-500" />
          </div>
          <span className="hidden md:block">share</span>
        </button>
      </div>
    </div>
  );
}