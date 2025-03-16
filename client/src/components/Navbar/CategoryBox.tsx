"use client"

import type React from "react"
import type { IconType } from "react-icons"
import { motion } from "framer-motion"

interface CategoryBoxProps {
  icon: IconType
  label: string
  selected?: boolean
  onClick?: () => void
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5
        ,transition:{
          duration:0.01
        }
       }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-2 
        p-3 rounded-xl cursor-pointer transition-all
        ${selected ? " text-teal-800 font-extrabold underline" : "hover:bg-neutral-50 text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <p className="font-medium text-sm">{label}</p>
    </motion.div>
  )
}

export default CategoryBox

