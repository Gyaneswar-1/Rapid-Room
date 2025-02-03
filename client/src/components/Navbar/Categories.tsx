import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import CategoryBox from "./CategoryBox";
import { useRef } from "react";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property close to the beach !",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmill !",
  },
  {
    label: "modern",
    icon: MdOutlineVilla,
    description: "This property has windmill !",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is in the cpontryside !",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a Pool !",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island !",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is cloase to lake !",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activity !",
  },
  {
    label: "Castels",
    icon: GiCastle,
    description: "This property is in an castel !",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activity !",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is on an island !",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in Desert !",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in Barn !",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is Luxurious !",
  },
];
function Categories() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="relative  flex ">
        <div
          ref={containerRef}
          className="flex pt-4 flex-row items-center justify-evenly overflow-x-auto w-full"
        >
          {categories.map((items) => (
            <CategoryBox
              key={items.label}
              label={items.label}
              // description={items.description}
              icon={items.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
