import { IoStar } from "react-icons/io5"
import { motion } from "motion/react"

function Card({ hotelName, perNight, country, city, onclick, image, overalRating }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.88,
      }}
      className="w-full h-fit rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden cursor-pointer"
      onClick={onclick}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={
            image
              ? image
              : "https://a0.muscache.com/im/pictures/3aa09cd0-bcec-430e-9f25-7384cffb6a58.jpg?im_w=720&im_format=avif&im_origin=fuzzy"
          }
          alt={hotelName || "Hotel image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-900 truncate max-w-[80%]">{hotelName}</h3>
          <div className="flex items-center gap-1 text-sm">
            <IoStar className="text-amber-500" />
            <span>{overalRating || 5}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1 truncate">
          {city}, {country}
        </p>
        {/* <p className="text-gray-500 text-xs mb-2">3-12 mar</p> */}
        <p className="font-semibold">
          ₹{perNight} <span className="font-normal text-sm">night</span>
        </p>
      </div>
    </motion.div>
  )
}

export default Card

