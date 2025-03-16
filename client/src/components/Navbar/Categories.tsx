"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  return (
    <div className="relative w-full pt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
      >
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          aria-label="Scroll left"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>
      </motion.div>

      <div className="mx-10 overflow-hidden">
        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 justify-around"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
      >
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition"
          aria-label="Scroll right"
        >
          <MdKeyboardArrowRight size={24} />
        </button>
      </motion.div>
    </div>
  )
}

export default Categories

