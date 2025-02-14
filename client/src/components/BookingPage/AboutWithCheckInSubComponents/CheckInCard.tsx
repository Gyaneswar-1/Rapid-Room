//fortesting purpose
import checkInHandler from "../../../service/checkin/checkInService";
import { useForm, SubmitHandler } from "react-hook-form";

type checkInType = {
  checkInDate: string; // Date input, stored as string
  checkOutDate: string; // Date input, stored as string
  guests: number; // Number input
};


//state management
import { AppDispatch, RootState } from "../../../store/store";
import { setStayingFor,setTotalAmount } from "../../../store/reducers/checkIn.reducer";
import { useDispatch, useSelector } from "react-redux";



export default function CheckInCard({ perNight, cleaningFee, numberOfGuests }: any) {

  //state management
  const { stayingFor,totalAmount } = useSelector((state: RootState) => state.checkInReducer);
  const dispatch: AppDispatch = useDispatch();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<checkInType>();

  const today = new Date().toISOString().split("T")[0];
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");
  const checkIn:any = new Date(checkInDate);
  const checkOut:any = new Date(checkOutDate);
  const difference = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

  const onSubmit: SubmitHandler<checkInType> = (data: any) => {
    console.log(data);
    dispatch(setStayingFor(difference))
    dispatch(setTotalAmount(perNight * difference + cleaningFee + 200))
    
    checkInHandler(totalAmount);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card sticky md:top-32 rounded-xl flex flex-col gap-4 w-full h-max shadow-2xl p-4"
    >
      <div className="price text-2xl font-semibold tracking-wide">
        {`₹${perNight} night`}
      </div>

      <div className="checkinout w-full flex flex-col border rounded-xl">
        <div className="date flex  border-b ">
          <div className="checkin w-1/2 flex flex-col border-r-2 border-r-transparent py-2 text-sm font-semibold px-2 border border-transparent focus-within:border-black focus-within:border-r-black  rounded-tl-lg duration-150">
            <label>Check in</label>
            <input
              type="date"
              className="font-thin outline-none"
              defaultValue={today}
              {...register("checkInDate", {
                required: {
                  value: true,
                  message: "Select the check in date",
                },
                validate: (value) => {
                  return (
                    value >= today || "Date must be today or a future date"
                  );
                },
              })}
            />
            <p className=" w-full overflow-hidden h-6 text-xm font-thin text-red-700">{errors.checkInDate && "Invalid date"}</p>
          </div>
          <div className="checkout w-1/2 py-2 flex flex-col text-sm font-semibold px-2 border border-transparent focus-within:border-black rounded-tr-lg focus-within:border-l-black border-l-2 border-l-transparent duration-150">
            <label>Check out</label>
            <input
              type="date"
              className="font-thin outline-none"
              defaultValue={today}
              {...register("checkOutDate", {
                required: {
                  value: true,
                  message: "Select the check-out date",
                },
                validate: (value) => {
                  if (value < today) {
                    return "Date must be today or a future date";
                  }
                  const checkInDate = watch("checkInDate");
                  if (checkInDate && new Date(value) <= new Date(checkInDate)) {
                    return "Check-out date must be at least one day after the check-in date";
                  }
                  return true;
                },
              })}
            />
              <p className="w-full overflow-hidden h-6 text-xm font-thin text-red-700">{errors.checkOutDate && "Invalid date"}</p>
          </div>
        </div>
        <div className="syay px-2 flex flex-col text-sm font-semibold border border-transparent focus-within:border-black rounded-bl-lg rounded-br-lg duration-150">
          <label>Guests</label>
          <input
            type="number"
            className="outline-none font-thin  md:py-2 "
            placeholder="1 guest"
            defaultValue={1}
            {...register("guests", {
              required: {
                value: true,
                message: "Enter the number of guests",
              },
              min: {
                value: 1,
                message: "Minimum 1 guest is required",
              },
              max: {
                value: numberOfGuests,
                message: `Maximum ${numberOfGuests} guests are allowed`,
              },
            })}
          />
          <p className="w-full overflow-hidden h-6  text-sm font-thin text-red-700">{errors.guests && errors.guests.message}</p>
        </div>
      </div>
      <button className="bg-teal-500 hover:bg-teal-600 duration-150 py-4 text-xl font-semibold text-white rounded-xl">
        Reserve
      </button>

      <div className="calculate border-b py-4">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between px-2">
            <div className="left underline">{`₹${perNight} x ${difference}`}</div>
            <div className="right">{`₹${perNight * difference}`}</div>
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
          <div className="right">{`₹${perNight * difference + cleaningFee + 200}`}</div>
        </div>
      </div>
    </form>
  );
}
