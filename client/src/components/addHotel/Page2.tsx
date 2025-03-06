// src/components/Page2.jsx

import { CgGym } from "react-icons/cg";
import { CiWifiOn } from "react-icons/ci";
import { FaCar, FaFirstAid } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { GiCampfire, GiPoolTableCorner } from "react-icons/gi";
import { IoTvOutline } from "react-icons/io5";
import { LiaSwimmingPoolSolid, LiaHotTubSolid } from "react-icons/lia";
import { LuTreeDeciduous } from "react-icons/lu";
import {
  MdBalcony,
  MdOutlineOutdoorGrill,
  MdOutlineShower,
} from "react-icons/md";
import { PiWashingMachine, PiFireExtinguisher } from "react-icons/pi";
import { TbToolsKitchen3, TbAlarmSmoke } from "react-icons/tb";
import Slide2Buttons from "./Slide2Buttons";
import React from "react";

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

const Page2 = ({ register, errors }: { register: any; errors: any }) => {
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
    new Set()
  );
  console.log(register,errors)
  const handleSelection = (name: any) => {
    setSelectedItems((prev: Set<string>) => {
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
    <div className="xl:px-68 md:px-42 px-2 w-full">
        <div className="elements flex flex-col pt-8 w-full">
          <h1 className="font-medium text-black text-3xl">
            Tell guests what your place has to offer
          </h1>
          <div className="pt-8 md:py-5 p-0.5 flex gap-3 flex-wrap justify-start ">
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
          <div className="pt-8 md:py-5 p-0.5 flex gap-3 flex-wrap w-full justify-start ">
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
          <div className="pt-8 md:py-5 p-0.5 flex gap-3 flex-wrap w-full justify-start ">
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
};

export default Page2;
