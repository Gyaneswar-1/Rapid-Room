

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import CategoryBox from "./CategoryBox";
import {
  Building2,
  Castle,
  Diamond,
  Eye,
  Fish,
  Hotel,
  House,
  Mountain,
  Palmtree,
  Ship,
  Snowflake,
  Sun,
  Tent,
  Tractor,
  Trees,
} from "lucide-react";

export const categories = [
  {
    label: "Beach",
    icon: Sun,
    description: "This property is close to the beach!",
  },
  {
    label: "City",
    icon: Building2,
    description: "This property is in a vibrant city!",
  },
  {
    label: "Mountain",
    icon: Mountain,
    description: "This property is in the mountains!",
  },
  {
    label: "Resort",
    icon: Hotel,
    description: "This property is a resort!",
  },
  {
    label: "Luxury",
    icon: Diamond,
    description: "This property is luxurious!",
  },
  {
    label: "Amazing Views",
    icon: Eye,
    description: "This property has amazing views!",
  },
  {
    label: "Farms",
    icon: Tractor ,
    description: "This property is on a farm!",
  },
  {
    label: "Arctic",
    icon: Snowflake ,
    description: "This property is on a Arctic!",
  },
  {
    label: "Historical Homes",
    icon: House,
    description: "This property is a historical home!",
  },
  {
    label: "Beachfront",
    icon: Sun,
    description: "This property is right on the beachfront!",
  },
  {
    label: "Lakefront",
    icon: Ship,
    description: "This property is on a lakefront!",
  },
  {
    label: "Castles",
    icon: Castle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: Tent,
    description: "This property has camping activities!",
  },
  {
    label: "Tropical",
    icon: Fish,
    description: "This property is in a tropical location!",
  },
  {
    label: "Islands",
    icon: Palmtree,
    description: "This property is on an island!",
  },
  {
    label: "Countryside",
    icon: Trees,
    description: "This property is in the countryside!",
  },
];
function Categories() {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

   // Get category from URL search params
   const categoryParam = searchParams.get('category');
   const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
 

 // Update URL when category changes
 const handleCategoryClick = (category: string) => {
  if (selectedCategory === category) {
    // Deselect category
    setSelectedCategory(null);
    
    // Remove category from search params
    searchParams.delete('category');
    setSearchParams(searchParams);
  } else {
    // Select new category
    setSelectedCategory(category);
    
    // Update search params with new category
    searchParams.set('category', category);
    setSearchParams(searchParams);
  }
};

useEffect(() => {
  setSelectedCategory(categoryParam);
}, [categoryParam]);


  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { current } = containerRef;
      const scrollAmount = 300;

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  if (location.pathname !== "/home") {
    return null;
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
          className="flex gap-5 overflow-x-auto scrollbar-hide py-1 px-1 justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={selectedCategory === item.label}
              onClick={() => handleCategoryClick(item.label)}
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
  );
}

export default Categories;
