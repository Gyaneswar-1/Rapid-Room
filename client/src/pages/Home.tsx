
import { useEffect, useState } from "react"
import BottomNav from "../components/Navbar/BottomNav"
import Card from "../components/homepage/Card"
import Navbar from "../components/Navbar/Navbar"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getHotels } from "../service/getHotels.service"
import { getAllHotels,setHaveHotels } from "../store/reducers/hotel.reducers"
import Loader from "../components/Reusable/Loader"

//state management
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { flipSignin } from "../store/reducers/showAuthCard.reducers"

import Signin from "../components/UserAuth/Signin"
import Signup from "../components/UserAuth/Signup"
import OtpVerification from "../components/UserAuth/OtpVerification"

import SetUserDataToStore from "../service/userdata/SetDataToStore";
import ChangePasswordModal from "../components/UserAuth/ChangePasswordModal"

interface Address {
  city: string
  country: string
}

export interface Hotel {
  id: number
  hotelName: string
  perNight: number
  type: string
  address: Address
}

export interface Result {
  hotels: Hotel[]
  pagination: {
    currentPage: number
    pageSize: number
    totalHotels: number
    totalPages: number 
  }
}

function Home() {

  const isLoggedIn = localStorage.getItem("loggedin")
  const [showLoader, setShowLoader] = useState(true)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  const categoryParam = searchParams.get('category')

  const { hotels,hasHotelsArray } = useSelector((state: RootState) => state.hotelReducer)
  const { showSignup, showSignin,showOtpVerificaton,showForgotPass } = useSelector((state: RootState) => state.showAuthCardReducer)
  const { search } = useSelector((state: RootState) => state.searchReducer)

  const dispatch: AppDispatch = useDispatch()

  

  useEffect(() => {
    if(!hasHotelsArray){
      getHotels(1, 10000)
      .then(async (res) => {
        if (res.success === true) {
          setShowLoader(false)
          dispatch(getAllHotels(res.data))
          dispatch(setHaveHotels(true));
        } else {
          dispatch(
            getAllHotels([
              {
                id: "",
                hotelName: "",
                perNight: "",
                address: { country: "", city: "" },
                reviews: [{ overalRating: "" }],
              },
            ]),
          )
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(
          getAllHotels([
            {
              id: "",
              hotelName: "",
              perNight: "",
              address: { country: "", city: "" },
              reviews: [{ overalRating: "" }],
            },
          ]),
        )
      })
    }else{
      setShowLoader(false);
    }
      
  }, [])

 

  const filteredHotels = hotels.filter((hotel: any) => {
    // Text search filter
    const matchesSearch = 
      hotel.hotelName?.toLowerCase().includes(search?.toLowerCase()) ||
      hotel.address?.country?.toLowerCase().includes(search?.toLowerCase()) ||
      hotel.address?.city?.toLowerCase().includes(search?.toLowerCase())
    
    // Category filter
    const matchesCategory = !categoryParam || 
      hotel.type?.toLowerCase() === categoryParam?.toLowerCase()
    
    // Return true if both conditions are met
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar show={true} />

      <main className="w-full pt-[80px] sm:pt-[100px] md:pt-[120px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {showLoader ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <Loader />
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-gray-700">No hotels found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid md:pt-14 pt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredHotels.map((hotel: any) => (
                <div key={hotel.id} className="w-full">
                  <Card
                    id={hotel.id}
                    onclick={() => {
                      if (!isLoggedIn) {
                        dispatch(flipSignin(showSignin))
                      } else {
                        navigate(`/book-hotel?hotelId=${hotel.id}`)
                      }
                    }}
                    hotelName={hotel.hotelName}
                    perNight={hotel.perNight}
                    country={hotel.address.country}
                    city={hotel.address.city}
                    overalRating={hotel?.reviews[0]?.overallRating ? hotel.reviews[0].overallRating : 5}
                    image={hotel.images && hotel.images[0]?.imageUrl ? hotel.images[0]?.imageUrl : ""}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <BottomNav /> 
      </div>

      {showSignin && <Signin />}
      {showSignup && <Signup />}
      {showOtpVerificaton && <OtpVerification />}
       {showForgotPass && <ChangePasswordModal></ChangePasswordModal>}
      <SetUserDataToStore/>
    </div>
  )
}

export default Home

