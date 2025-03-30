

import type React from "react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"

interface MenuItemProps {
  onClick: () => void
  label: string
  style?: string
  icons: IconType
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, style, icons: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ backgroundColor: "#f3f4f6" }}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2.5 
        cursor-pointer transition-colors rounded-md
        ${style || "text-gray-700"}
      `}
    >
      <Icon className="text-lg" />
      <span className="font-medium text-sm">{label}</span>
    </motion.div>
  )
}

export default MenuItem

