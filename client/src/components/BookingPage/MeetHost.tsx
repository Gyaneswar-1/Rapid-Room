import { FaStar } from "react-icons/fa";

export default function MeetHost() {
  return (
    <div className="py-8 border-t border-t-gray-300 flex flex-col gap-4 md:gap-8">
      <h1 className="text-xl font-bold tracking-wide">Meet your host</h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-2 ">
        <div className="">
          <div className="hostcard flex md:justify-evenly justify-around items-center rounded-2xl md:py-12 py-4 shadow-2xl">
            <div className="pt1 flex flex-col items-center gap-1">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.02eZAVpnIViQOA6eJJO0VgHaF-&pid=Api&P=0&h=180"
                alt=""
                className="md:h-32 md:w-32 h-28 w-28  rounded-full object-center object-cover"
              />
              <div className="texts">
                <div className="name text-lg font-bold">Bibek samal</div>
                <div className="tag text-lg font-semibold">super host</div>
              </div>
            </div>
            <div className="pt2 w-1/3">
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300 w-full ">
                <div className="num text-lg font-bold">198</div>
                <div className="text text-sm font-bold">Reviews</div>
              </div>
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300 w-full ">
                <div className="num text-lg font-bold flex items-center gap-2">
                  4.8
                  <FaStar className="text-sm" />
                </div>
                <div className="text text-sm font-bold">Rating</div>
              </div>
              <div className="bx py-4 flex flex-col items-start border-b border-b-gray-300  0 w-full">
                <div className="num text-lg font-bold">8</div>
                <div className="text text-sm font-bold">Years hosting</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:col-span-2 flex flex-col  items-start justify-center pl-12 gap-6">
          <div className="info flex flex-col gap-2">
            <div className="name text-xl font-bold">Bibek samal</div>
            <p className="text-lg font-semibold">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </p>
          </div>

          <div className="hostdetail flex flex-col gap-2">
            <h1 className="text-xl font-bold">Host details</h1>
            <div>
              <p className="text-lg font-semibold">Response rate: 100%</p>
              <p className="text-lg font-semibold">Responds within an hour</p>
            </div>
          </div>
          <button className="text-xl font-semibold text-white bg-neutral-500 hover:bg-neutral-600 duration-150 px-4 py-2 rounded-lg w-max">
            Message Host
          </button>
        </div>
      </div>
    </div>
  );
}