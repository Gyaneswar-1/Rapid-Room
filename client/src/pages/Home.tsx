import { useEffect } from "react";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { asyncGetHotels } from "../store/actions/Hotels.actions";

interface Address {
  city: string ;
  country: string ;
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
  const navigate = useNavigate();
  const {hotels,pagination}  = useSelector((state: RootState) => state.hotelReducer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(asyncGetHotels());
  }, []);

  // console.log("reult",hotels.hotels);

  return (
    <div className="h-screen w-full">
      <Navbar />
      <div className="w-full h-full pt-[196px] flex justify-center">
        <div className="flex w-[90rem] gap-8 flex-wrap justify-evenly h-fit">
          {true ? (
            hotels.map((data: Hotel, index: number) => (
             <div>{data.hotelName}</div>
            ))
          ) : (
            <p className="text-center text-xl">No hotels available</p>
          )}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Home;