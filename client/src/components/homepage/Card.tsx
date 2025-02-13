import { IoStar } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";

function Card({
  hotelName,
  perNight,
  country,
  city,
  id,
  onclick,
  image,
  overalRating,
}: any) {
  return (
    <div
      className="h-fit md:w-80 w-72 cursor-pointer rounded-2xl  text-black shadow-2xl"
      onClick={onclick}
    >
      <div className="relative h-70 md:w-80 w-72  p-2 items-center overflow-hidden">
        <button className="absolute top-0 right-0 m-2 text-2xl p-3">
          <FaHeart className="text-rose-500 hover:text-rose-600" />
        </button>
        <img
          src={
            image
              ? image
              : "https://a0.muscache.com/im/pictures/3aa09cd0-bcec-430e-9f25-7384cffb6a58.jpg?im_w=720&im_format=avif&im_origin=fuzzy"
          }
          alt=""
          className="h-full w-full object-cover  rounded-xl"
        />
      </div>
      <div className="text-grid p-2 text-white max-h-80">
        <div className="grid grid-flow-col grid-rows-4  ">
          <div className="text-black">
            {city.length > 10 ? `${city.slice(0, 10)}...` : city},
            {country.length > 10 ? `${country.slice(0, 10)}...` : country}
          </div>
          <div className="text-black opacity-75  ">{hotelName}</div>
          <div className="text-sm text-black  opacity-75 ">3-12 mar</div>
          <div className="text-sm text-black">₹{perNight} night</div>
          <div className="flex items-center text-black gap-1 justify-end">
            <div className="icon text-red-500 ">
              <IoStar />
            </div>
            <p className="rating">{overalRating}</p>
          </div>
          28
        </div>
      </div>
    </div>
  );
}

export default Card;
