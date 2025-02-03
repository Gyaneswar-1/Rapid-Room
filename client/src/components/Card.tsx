import { IoStar } from "react-icons/io5";
import { FcLike } from "react-icons/fc";

interface CardProps {

  image: string;

}

function Card(data:CardProps) {
  return (
    <div className="h-fit w-80  rounded-2xl bg-neutral-100 text-black shadow-xl">
      <div className="relative h-70 w-80 p-2 items-center">
        <button className="absolute top-0 right-0 m-2 text-2xl p-3">
          <FcLike />
        </button>
        <img
        src={data.image}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div className="text-grid p-2 text-white max-h-80">
        <div className="grid grid-flow-col grid-rows-4  ">
          <div className="text-black">Bhubaneswar,India</div>
          <div className="text-black opacity-75 ">Hotel name</div>
          <div className="text-sm text-black  opacity-75 ">3-12 mar</div>
          <div className="text-sm text-black">₹6000 per night</div>
          <div className="flex items-center text-black gap-1 justify-end">
            <div className="icon text-red-500">
              <IoStar />
            </div>
            <p className="rating">4.59</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
