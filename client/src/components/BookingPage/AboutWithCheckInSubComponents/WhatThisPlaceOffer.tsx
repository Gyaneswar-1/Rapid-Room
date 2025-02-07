import { BsHandbag } from "react-icons/bs";
import { FaTv } from "react-icons/fa";
import { GiGreenhouse } from "react-icons/gi";
import { IoLockClosedOutline, IoWifiOutline } from "react-icons/io5";
import { LuFlower2, LuWashingMachine } from "react-icons/lu";
import { MdOutlineBathtub, MdOutlineFoodBank } from "react-icons/md";
import { PiHairDryerThin } from "react-icons/pi";

export default function WhatThisPlaceOffer(){
  return(
    <div className="offer md:py-8 flex flex-col gap-4  ">
          <h1 className="font-semibold text-2xl tracking-wide">
            What this place offers
          </h1>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
            <div className=" rounded-lg ">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4 text-lg font-thin">
                  <IoLockClosedOutline className="text-2xl" />
                  Lock on bedroom door
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <IoWifiOutline className="h-6 w-6" />
                  Wifi
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <FaTv className="h-6 w-6" />
                  TV with internet
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <GiGreenhouse className="h-6 w-6" />
                  Patio or balcony
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <BsHandbag className="h-6 w-6" />
                  Luggage drop-off allowed
                </li>
              </ul>
            </div>
            <div className=" rounded-lg ">
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-4 text-lg font-thin">
                  <MdOutlineFoodBank className="text-2xl" />
                  Kitchen
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <MdOutlineBathtub className="h-6 w-6" />
                  Dedicated workspace
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <LuWashingMachine className="h-6 w-6" />
                  Washing machine
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <LuFlower2 className="h-6 w-6" />
                  Garden
                </li>
                <li className="flex gap-4 text-lg font-thin">
                  <PiHairDryerThin className="h-6 w-6" />
                  Hair dryer
                </li>
              </ul>
            </div>
          </div>
        </div>
  )
}