"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"
import { MdOutlineVilla, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
import { FaSkiing } from "react-icons/fa"
import CategoryBox from "./CategoryBox"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property has a modern design!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in an arctic environment!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
]

function Categories() {
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { current } = containerRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  if (location.pathname !== "/home") {
    return null
  }

  return (
    <div className="relative w-full py-4">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white shadow-md hover:shadow-lg transition border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hidden md:block"
        aria-label="Scroll left"
      >
        <MdKeyboardArrowLeft size={20} />
      </button>

      {/* Categories container */}
      <div className="mx-8 overflow-hidden">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={selectedCategory === item.label}
              onClick={() => setSelectedCategory(selectedCategory === item.label ? null : item.label)}
            />
          ))}
        </motion.div>
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white shadow-md hover:shadow-lg transition border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 hidden md:block"
        aria-label="Scroll right"
      >
        <MdKeyboardArrowRight size={20} />
      </button>
    </div>
  )
}

export default Categories

