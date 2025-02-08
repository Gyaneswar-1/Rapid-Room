import React, { useState } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { BsCashStack } from "react-icons/bs";
import { FaCity, FaSnowman, FaUmbrellaBeach } from "react-icons/fa";
import { GiForestEntrance, GiPoolDive, GiFarmTractor, GiHillFort, GiSwamp, GiCampingTent, GiTropicalFish, GiTreeDoor, GiVillage, GiLockedFortress } from "react-icons/gi";
import { IoDiamondOutline, IoBoatSharp } from "react-icons/io5";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { MdKitesurfing, MdOutlineCastle, MdOutlineCabin } from "react-icons/md";
import { PiMountainsBold, PiGlobeStandBold, PiCityDuotone, PiIsland } from "react-icons/pi";

function Slide4() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative w-screen flex justify-center items-center flex-col">
      <div
        className="inline-flex  items-center overflow-hidden rounded-md border bg-white"
        onClick={() => setIsActive(!isActive)}
      >
        <a className=" cursor-pointer border-e px-4 py-2 w-full text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          ?
        </a>
      </div>

      {isActive && (
        <div
          className="relative end-0  z-10 mt-2 w-1/2 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <FaUmbrellaBeach /> BEACH
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <FaCity /> CITY
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <PiMountainsBold />
              MOUNTAIN
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              RESORT
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <BsCashStack />
              BUDGET
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <IoDiamondOutline />
              LUXURY
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiForestEntrance />
              AMAZING_VIEWS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiPoolDive />
              AMAZING_POOLS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiFarmTractor />
              FARMS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiHillFort />
              HISTORICAL_HOMES
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <MdKitesurfing />
              SURFING
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <LiaUmbrellaBeachSolid />
              BEACHFRONT
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiSwamp />
              LAKEFRONT
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <MdOutlineCastle />
              CASTLES
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiCampingTent />
              CAMPING
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <IoBoatSharp />
              BOATS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiTropicalFish />
              TROPICAL
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <PiGlobeStandBold />
              TOP_OF_THE_WORLD
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <PiCityDuotone />
              TOP_CITIES
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <FaSnowman />
              ARCTIC
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiTreeDoor />
              TREEHOUSES
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <MdOutlineCabin />
              CABINS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <BiHomeSmile />
              TINY_HOMES
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <PiIsland />
              ISLANDS
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiVillage />
              COUNTRYSIDE
            </a>
            <a className=" flex  gap-3 items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer">
              <GiLockedFortress />
              MANSION
            </a>

            <form method="POST" action="#">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Slide4;
