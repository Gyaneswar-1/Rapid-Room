import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Card from "../components/homepage/Card";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { getHotels } from "../service/getHotels.service";
import { getAllHotels } from "../store/reducers/hotel.reducers";
import Loader from "../components/Reusable/Loader";

//state management
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  
  flipSignin,
} from "../store/reducers/showAuthCard.reducers";




import Signin from "../components/UserAuth/Signin";
import Signup from "../components/UserAuth/Signup";


interface Address {
  city: string;
  country: string;
}

export interface Hotel {
  id: number;
  hotelName: string;
  perNight: number;
  type: string;
  address: Address;
}

export interface Result {
  hotels: Hotel[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalHotels: number;
    totalPages: number;
  };
}

function Home() {
  const isLoggedIn = localStorage.getItem("loggedin");

  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  //state management
  const { hotels } = useSelector((state: RootState) => state.hotelReducer);
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  const { search} = useSelector(
    (state: RootState) => state.searchReducer
  );

  const dispatch: AppDispatch = useDispatch();
  async function delay() {
    await new Promise((res) => {
      setTimeout(() => {
        res("");
      }, 1500);
    });
  }
  useEffect(() => {
    getHotels(1, 10)
      .then(async (res) => {
        if (res.success === true) {
          await delay();
          setShowLoader(false);
          console.log("here is the hotel data", res.data);
          dispatch(getAllHotels(res.data));
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
            ])
          );
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          getAllHotels([
            {
              id: "",
              hotelName: "",
              perNight: "",
              address: { country: "", city: "" },
              reviews: [{ overalRating: "" }],
            },
          ])
        );
      });
  }, []);

  // console.log(hotels);

  return (
    <>
    
      <div className="h-screen w-full ">
        <Navbar show={true} />
        <div className="w-full h-full pt-[196px] flex justify-center ">
          <div className="flex w-[90rem] gap-8 flex-wrap justify-center h-fit ">
            {showLoader ? (
              <Loader></Loader>
            ) : (
              hotels.map((e: any) => {
                if (
                  e.hotelName.toLowerCase().startsWith(search.toLowerCase()) || 
                  e.address.country.toLowerCase().startsWith(search.toLowerCase()) || 
                  e.address.city.toLowerCase().startsWith(search.toLowerCase())
                ) {
                  return (
                    <Card
                      key={e.id}
                      id={1}
                      onclick={() => {
                        if (!isLoggedIn) {
                          dispatch(flipSignin(showSignin));
                        } else {
                          navigate(`/book-hotel?hotelId=${e.id}`);
                        }
                      }}
                      hotelName={e.hotelName}
                      perNight={e.perNight}
                      country={e.address.country}
                      city={e.address.city}
                      overalRating={e?.reviews[0]?.overallRating ? e.reviews[0].overallRating : 5}
                      image={e.images[0]?.imageUrl ? e.images[0]?.imageUrl : ""}
                    />
                  );
                }
                return null;
              })
              
            )}
          </div>
          <BottomNav />
        </div>
      </div>
      {showSignin && <Signin />}
      {showSignup && <Signup />}
    </>
  );
}

export default Home;
