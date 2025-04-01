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
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1
        py-2 px-3 rounded-xl cursor-pointer transition-all
        ${
          selected
            ? "border-b-2 border-primary text-primary"
            : "text-secondary hover:text-gray-800 hover:border-b-2 hover:border-gray-200"
        }
      `}
    >
      <Icon size={24} className={selected ? "text-primary" : ""} />
      <p className="text-xs font-medium whitespace-nowrap">{label}</p>
    </motion.div>
  )
}

export default CategoryBox

