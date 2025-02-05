import { FaStar } from "react-icons/fa";



export default function Reviews({onclick}:any) {
 
  return (
    <div className="w-full py-8 grid md:grid-cols-2 border-t border-gray-300">
      <div className="card flex flex-col gap-2 m-2">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src="https://a0.muscache.com/im/pictures/user/e349f69e-6f7f-4a69-98ef-391baafed14a.jpg?im_w=240&amp;im_format=avif"
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-lg font-medium  truncate ">Bibek samal</p>
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
          Reprehenderit possimus voluptatibus eius neque mollitia dolore aliquam
          expedita dolores natus corrupti. Repellat ipsa debitis, delectus odit
          architecto minus dolorem numquam molestiae!
        </div>
        <button
          onClick={() => {
            onclick();
          }}
          className="px-2 py-1 bg-neutral-500 hover:bg-neutral-600 duration-150 text-white rounded-lg w-max  font-semibold"
        >
          Show more
        </button>
      </div>
      <div className="card flex flex-col gap-2 m-2">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src="https://4kpictures.co.in/wp-content/uploads/2024/05/Beautiful-girls-black-and-white-pictures-1.jpg"
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-lg font-medium  truncate ">Biswa bijay</p>
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
          Reprehenderit possimus voluptatibus eius neque mollitia dolore aliquam
          expedita dolores natus corrupti. Repellat ipsa debitis, delectus odit
          architecto minus dolorem numquam molestiae!
        </div>
        <button
          onClick={() => {
           onclick();
          }}
          className="px-2 py-1 bg-neutral-500 hover:bg-neutral-600 duration-150 text-white rounded-lg w-max  font-semibold"
        >
          Show more
        </button>
      </div>
      <div className="card flex flex-col gap-2 m-2">
        <div className="flex items-center">
          <div className="shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src="https://tse1.mm.bing.net/th?id=OIP.d3mH_Q2UDR50-DVRHQjxcgHaJG&pid=Api&P=0&h=180"
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-lg font-medium  truncate ">Rajat sahoo</p>
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
          Reprehenderit possimus voluptatibus eius neque mollitia dolore aliquam
          expedita dolores natus corrupti. Repellat ipsa debitis, delectus odit
          architecto minus dolorem numquam molestiae!
        </div>
        <button
          onClick={() => {
           onclick();
          }}
          className="px-2 py-1 bg-neutral-500 hover:bg-neutral-600 duration-150 text-white rounded-lg w-max  font-semibold"
        >
          Show more
        </button>
      </div>
      <div className="card flex flex-col gap-2 m-2">
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
          Reprehenderit possimus voluptatibus eius neque mollitia dolore aliquam
          expedita dolores natus corrupti. Repellat ipsa debitis, delectus odit
          architecto minus dolorem numquam molestiae!
        </div>
        <button
          onClick={() => {
           onclick();
          }}
          className="px-2 py-1 bg-neutral-500 hover:bg-neutral-600 duration-150 text-white rounded-lg w-max  font-semibold"
        >
          Show more
        </button>
      </div>
    </div>
  );
}