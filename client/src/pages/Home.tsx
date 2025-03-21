
import { useEffect, useState } from "react"
import BottomNav from "../components/Navbar/BottomNav"
import Card from "../components/homepage/Card"
import Navbar from "../components/Navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { getHotels } from "../service/getHotels.service"
import { getAllHotels } from "../store/reducers/hotel.reducers"
import Loader from "../components/Reusable/Loader"

//state management
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { flipSignin } from "../store/reducers/showAuthCard.reducers"

import Signin from "../components/UserAuth/Signin"
import Signup from "../components/UserAuth/Signup"
import { getuserData } from "../service/userdata/getuserData"

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

  //state management
  const { hotels } = useSelector((state: RootState) => state.hotelReducer)
  const { showSignup, showSignin } = useSelector((state: RootState) => state.showAuthCardReducer)
  const { search } = useSelector((state: RootState) => state.searchReducer)

  const dispatch: AppDispatch = useDispatch()

  async function delay() {
    await new Promise((res) => {
      setTimeout(() => {
        res("")
      }, 1500)
    })
  }

  useEffect(() => {
    getHotels(1, 10)
      .then(async (res) => {
        if (res.success === true) {
          await delay()
          await getuserData()
          setShowLoader(false)
          dispatch(getAllHotels(res.data))
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
  }, [])

  const filteredHotels = hotels.filter(
    (e: any) =>
      e.hotelName?.toLowerCase().includes(search?.toLowerCase()) ||
      e.address?.country?.toLowerCase().includes(search?.toLowerCase()) ||
      e.address?.city?.toLowerCase().includes(search?.toLowerCase()),
  )

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
            <div className="grid pt-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
    </div>
  )
}

export default Home

