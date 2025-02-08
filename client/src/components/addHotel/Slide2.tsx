import React, { useState } from "react";
import Slide2Buttons from "./Slide2Buttons";
import { CiWifiOn } from "react-icons/ci";
import { IoTvOutline } from "react-icons/io5";
import { TbAlarmSmoke, TbToolsKitchen3 } from "react-icons/tb";
import { MdBalcony, MdOutlineOutdoorGrill, MdOutlineShower } from "react-icons/md";
import { FaComputer } from "react-icons/fa6";
import { PiFireExtinguisher, PiWashingMachine } from "react-icons/pi";
import { LuTreeDeciduous } from "react-icons/lu";
import { LiaHotTubSolid, LiaSwimmingPoolSolid } from "react-icons/lia";
import { FaCar, FaFirstAid } from "react-icons/fa";
import { GiCampfire, GiPoolTableCorner } from "react-icons/gi";
import { CgGym } from "react-icons/cg";

const basicAmenities = [
  { icon: CiWifiOn, name: "Wifi" },
  { icon: IoTvOutline, name: "TV" },
  { icon: TbToolsKitchen3, name: "Kitchen" },
  { icon: MdBalcony, name: "Balcony" },
  { icon: FaComputer, name: "WorkSpace" },
  { icon: PiWashingMachine, name: "Washing Machine" },
  { icon: LuTreeDeciduous, name: "Garden" },
  { icon: FaCar, name: "Parking" },
];

const standOutAmenities = [
  { icon: LiaSwimmingPoolSolid, name: "Pools" },
  { icon: LiaHotTubSolid, name: "Hot tub" },
  { icon: GiCampfire, name: "Firepit" },
  { icon: MdOutlineOutdoorGrill, name: "BBQ grill" },
  { icon: GiPoolTableCorner, name: "Pool table" },
  { icon: CgGym, name: "Exercise equipment" },
  { icon: MdOutlineShower, name: "Outdoor shower" },
];

const safetyItems = [
  { icon: TbAlarmSmoke, name: "smoke" },
  { icon: FaFirstAid, name: "First aid Kit" },
  { icon: PiFireExtinguisher, name: "Fire extinguisher" },
];

function Slide2() {
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleSelection = (name:any) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  return (
    <div className="w-screen bg-neutral-100 flex justify-center">
      <div className="elements md:w-[700px] pt-8 p-12">
        <h1 className="font-medium text-black text-3xl">
          Tell guests what your place has to offer
        </h1>
        <p>You can add more amenities after you publish your listing</p>
        <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
          {basicAmenities.map((amenity, index) => (
            <Slide2Buttons
              key={index}
              icon={amenity.icon}
              text={amenity.name}
              selected={selectedItems.has(amenity.name)}
              onClick={() => handleSelection(amenity.name)}
            />
          ))}
        </div>
        <p>Do you have any standout amenities?</p>
        <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
          {standOutAmenities.map((amenity, index) => (
            <Slide2Buttons
              key={index}
              icon={amenity.icon}
              text={amenity.name}
              selected={selectedItems.has(amenity.name)}
              onClick={() => handleSelection(amenity.name)}
            />
          ))}
        </div>
        <p>Do you have any safety items?</p>
        <div className="pt-8 md:p-5 p-0.5 flex gap-3 flex-wrap w-full justify-start">
          {safetyItems.map((amenity, index) => (
            <Slide2Buttons
              key={index}
              icon={amenity.icon}
              text={amenity.name}
              selected={selectedItems.has(amenity.name)}
              onClick={() => handleSelection(amenity.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slide2;
