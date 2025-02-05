import { IoStar } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { Hotel } from "../pages/Home";



function Card({ image, hotelName, perNight, type, address, onclick, id }: Hotel) {
  return (
    <div className="h-fit md:w-80 w-72 cursor-pointer rounded-2xl bg-neutral-100 text-black shadow-xl"
    onClick={onclick}
    >
      <div className="relative h-70 md:w-80 w-72  p-2 items-center">
        <button className="absolute top-0 right-0 m-2 text-2xl p-3">
          <FcLike />
        </button>
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover rounded-xl "
        />
      </div>
      <div className="text-grid p-2 text-white max-h-80">
        <div className="grid grid-flow-col grid-rows-4  ">
          <div className="text-black">{address.city.length > 28 ? `${address.city.slice(0,28)}...`: address.city},{address.country.length > 20 ? `${address.country.slice(0,20)}...`: address.country}</div>
          <div className="text-black opacity-75 ">{hotelName}</div>
          <div className="text-sm text-black  opacity-75 ">3-12 mar</div>
          <div className="text-sm text-black">₹{perNight} night</div>
          <div className="flex items-center text-black gap-1 justify-end">
            <div className="icon text-red-500">
              <IoStar />
            </div>
            <p className="rating">4.59</p>
          </div>28
        </div>
      </div>
    </div>
  );
}

export default Card;
