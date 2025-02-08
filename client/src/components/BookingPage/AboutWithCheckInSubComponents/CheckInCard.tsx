//fortesting purpose
import checkInHandler from "../../../service/checkin/checkInService"

export default function CheckInCard({perNight,cleaningFee}:any){
    return(
      <div className="card sticky md:top-32 rounded-xl flex flex-col gap-4 w-full h-max shadow-2xl p-4">
            <div className="price text-2xl font-semibold tracking-wide">
              {`₹${perNight} night`}
            </div>
            <div className="checkinout w-full flex flex-col border rounded-xl">
              <div className="date flex  border-b ">
                <div className="checkin w-1/2 flex flex-col border-r py-2 text-sm font-semibold px-2 border border-transparent focus-within:border-black rounded-tl-lg">
                  <label>Check in</label>
                  <input
                    type="date"
                    className="font-thin outline-none"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="checkout w-1/2 py-2 flex flex-col text-sm font-semibold px-2 border border-transparent focus-within:border-black rounded-tr-lg ">
                  <label>Check out</label>
                  <input type="date" className="font-thin outline-none" />
                </div>
              </div>
              <div className="syay py-2 px-2 flex flex-col text-sm font-semibold border border-transparent focus-within:border-black rounded-bl-lg rounded-br-lg">
                <label>Guests</label>
                <input
                  type="number"
                  className="outline-none font-thin"
                  placeholder="1 guest"
                />
              </div>
            </div>
            <button className="bg-teal-500 hover:bg-teal-600 duration-150 py-4 text-xl font-semibold text-white rounded-xl"
            onClick={()=>{
              const Totalamount= perNight * 2 + cleaningFee + 200;
              checkInHandler(Totalamount);
              
            }}
            >
              Reserve
            </button>
            <div className="calculate border-b py-4">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center justify-between px-2">
                  <div className="left underline">{`₹${perNight} x 2`}</div>
                  <div className="right">{`₹${perNight*2}`}</div>
                </li>
                <li className="flex items-center justify-between px-2">
                  <div className="left underline">Cleaning fee</div>
                  <div className="right">{`₹${cleaningFee}`}</div>
                </li>
                <li className="flex items-center justify-between px-2">
                  <div className="left underline">Rapid book fee</div>
                  <div className="right">₹200</div>
                </li>
              </ul>
            </div>
            <div className="totalfee px-3">
              <div className="flex items-center justify-between">
                <div className="left underline">Total</div>
                <div className="right">{`₹${perNight * 2 + cleaningFee + 200}`}</div>
              </div>
            </div>
          </div>
    )
  }