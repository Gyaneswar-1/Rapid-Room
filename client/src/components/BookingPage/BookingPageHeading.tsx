import { FaChevronLeft, FaShare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
export default function BookingPageHeading() {
  return (
    <div className="heading absolute w-full md:relative flex px-4 md:px-0 justify-between py-4 md:py-8">
      <div className="mainheading text-2xl tracking-wide font-semibold flex items-center">
        <div className="bg-white p-4 rounded-full">
          <FaChevronLeft className=" md:hidden  text-xl " />
        </div>
        <span className="hidden md:block ">
          Apartment with terrace, balcony+ breakfast
        </span>
      </div>
      <div className="btns flex  md:gap-4">
        <div className="btn1 hover:bg-gray-200 px-2  py-1 rounded-lg flex items-center gap-2">
          <div className="bg-white md:bg-transparent  p-4 md:p-0 rounded-full">
            <FaRegHeart className=" text-xl " />
          </div>
          <span className="hidden md:block">Like</span>
        </div>
        <div className="btn2 hover:bg-gray-200 px-2  py-1 rounded-lg flex items-center gap-2">
          <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-full">
            <FaShare className=" text-xl " />
          </div>
          <span className="hidden md:block">share</span>
        </div>
      </div>
    </div>
  );
}