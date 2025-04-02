import { Star } from "lucide-react"
//state management
import { AppDispatch, RootState } from "../../store/store";
import { setShowReservModel } from "../../store/reducers/showReservatonModel.reducer";
import { useDispatch, useSelector } from "react-redux";

type priceCardProp = {
    pricePerNight :number,
    cleaningFee: number,
    serviceFee: number,
    overalRating: number,
    totalReviews: number,

}

const PriceCard = ({cleaningFee,pricePerNight,serviceFee,overalRating,totalReviews}:priceCardProp) => {

  const { showReservatonModel } = useSelector((state: RootState) => state.toogleShowReseveModelReducer);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-bold">
                    ₹{pricePerNight}
                    </span>
                    <span className="text-gray-500"> night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                    <span>{overalRating} · </span>
                    <span className="ml-1 underline">
                      {totalReviews} reviews
                    </span>
                  </div>
                </div>

                <button
                  className="w-full mb-4 bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-lg font-medium"
                  onClick={() =>{
                    
                    dispatch((setShowReservModel(!showReservatonModel)))
                  } }
                >
                  Reserve
                </button>

                <div className="text-center text-sm">
                  You won't be charged yet
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="underline">
                    ₹{pricePerNight} x {1} nights
                    </span>
                    <span>₹{pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>₹{cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>
                      ₹{Math.round(serviceFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t font-semibold">
                    <span>Total before taxes</span>
                    <span>₹{pricePerNight + serviceFee + cleaningFee}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default PriceCard
