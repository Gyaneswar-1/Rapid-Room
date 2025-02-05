import { CiShoppingTag } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { LuMousePointerBan } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { TfiSpray } from "react-icons/tfi";
import { TiMessage } from "react-icons/ti";



export default function AllReviews({onclick}:any) {
  
  return (
    <div className="allreview h-screen fixed  w-screen top-0 mt-0 z-50  flex items-center justify-center md:bg-opacity-100 md:backdrop-brightness-90 md:backdrop-blur-[3px] ">
      <div className="  reviewWidow grid md:grid-cols-3 grid-cols-1 relative md:gap-2 w-full h-full md:h-9/11 md:w-7/11 overflow-hidden md:rounded-xl  bg-white  opacity-100 md:shadow-2xl md:shadow-black">
        <button
          className="absolute top-5 left-5"
          onClick={() => {
            onclick();
          }}
        >
          <RxCross1 className=" text-2xl font-thin" />
        </button>
        <div className="pt1 w-full   md:py-6 py-4  flex flex-col gap-2 items-center md:px-8">
          <div className="topsection">
            <div className="rating flex items-top  justify-center">
              <img
                className="h-32"
                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
                alt=""
              />
              <h1 className="font-bold text-6xl">5.0</h1>
              <img
                className="h-32"
                src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
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
          <div className="revews  w-full hidden md:block ">
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
                <li className="w-full h-12 border-b border-b-gray-300 flex justify-between items-center py-2">
                  <div className="category flex items-center gap-2">
                    <TfiSpray className="text-2xl" />
                    <h1 className="font-bold">Cleanliness</h1>
                  </div>
                  <div className="rating font-bold">5.o</div>
                </li>
                <li className="w-full h-12 border-b border-b-gray-300 flex justify-between items-center py-2">
                  <div className="category flex items-center gap-2">
                    <LuMousePointerBan className="text-2xl" />
                    <h1 className="font-bold">Accuracy</h1>
                  </div>
                  <div className="rating font-bold">5.o</div>
                </li>
                <li className="w-full h-12 border-b border-b-gray-300 flex justify-between items-center py-2">
                  <div className="category flex items-center gap-2">
                    <IoKeyOutline className="text-2xl" />
                    <h1 className="font-bold">Check-in</h1>
                  </div>
                  <div className="rating font-bold">5.o</div>
                </li>
                <li className="w-full h-12 border-b border-b-gray-300 flex justify-between items-center py-2">
                  <div className="category flex items-center gap-2">
                    <TiMessage className="text-2xl" />
                    <h1 className="font-bold">Communication</h1>
                  </div>
                  <div className="rating font-bold">5.o</div>
                </li>
                <li className="w-full h-12 border-b border-b-gray-300 flex justify-between items-center py-2">
                  <div className="category flex items-center gap-2">
                    <CiShoppingTag className="text-2xl" />
                    <h1 className="font-bold">Value</h1>
                  </div>
                  <div className="rating font-bold">5.o</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="  md:col-span-2 h-full    overflow-y-scroll md:px-8 px-4 ">
          <div className="top-0   sticky top-0  flex items-center justify-between bg-white py-2 border-b border-b-gray-300 ">
            <h1 className="text-2xl font-bold tracking-wide py-4">
              186 reviews
            </h1>
            <button className="px-4 py-2 border border-gray-300 rounded-2xl">
              Most Recent
            </button>
          </div>
          <div className="buttom   md:py-4 py-6 flex flex-col md:gap-4 gap-6">
            <div className="card flex flex-col gap-2 ">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-lg font-medium  truncate ">Gyana rout</p>
                  <p className="text-sm  font-thin  truncat">Odisha, india</p>
                </div>
              </div>
              <div className="stars flex gap-2  font-semibold">
                <div className="flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                .3 week ago
              </div>
              <div className="con">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit possimus voluptatibus eius neque mollitia dolore
                aliquam expedita dolores natus corrupti. Repellat ipsa debitis,
                delectus odit architecto minus dolorem numquam molestiae!
              </div>
            </div>
            <div className="card flex flex-col gap-2 ">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-lg font-medium  truncate ">Gyana rout</p>
                  <p className="text-sm  font-thin  truncat">Odisha, india</p>
                </div>
              </div>
              <div className="stars flex gap-2  font-semibold">
                <div className="flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                .3 week ago
              </div>
              <div className="con">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit possimus voluptatibus eius neque mollitia dolore
                aliquam expedita dolores natus corrupti. Repellat ipsa debitis,
                delectus odit architecto minus dolorem numquam molestiae!
              </div>
            </div>
            <div className="card flex flex-col gap-2 ">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-lg font-medium  truncate ">Gyana rout</p>
                  <p className="text-sm  font-thin  truncat">Odisha, india</p>
                </div>
              </div>
              <div className="stars flex gap-2  font-semibold">
                <div className="flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                .3 week ago
              </div>
              <div className="con">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit possimus voluptatibus eius neque mollitia dolore
                aliquam expedita dolores natus corrupti. Repellat ipsa debitis,
                delectus odit architecto minus dolorem numquam molestiae!
              </div>
            </div>
            <div className="card flex flex-col gap-2 ">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180"
                    alt="Neil image"
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-lg font-medium  truncate ">Gyana rout</p>
                  <p className="text-sm  font-thin  truncat">Odisha, india</p>
                </div>
              </div>
              <div className="stars flex gap-2  font-semibold">
                <div className="flex">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                .3 week ago
              </div>
              <div className="con">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reprehenderit possimus voluptatibus eius neque mollitia dolore
                aliquam expedita dolores natus corrupti. Repellat ipsa debitis,
                delectus odit architecto minus dolorem numquam molestiae!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

