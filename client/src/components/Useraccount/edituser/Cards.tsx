import React from "react"
import type { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface CardProps {
  icon: IconType
  title: string
  description: string
  toThe: string
}

function Cards({ icon, title, description, toThe }: CardProps) {
  return (
    <Link
      to={toThe}
      className="group bg-white border border-gray-200 rounded-xl p-6 flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:border-gray-300 hover:translate-y-[-2px]"
    >
      <div className="text-4xl text-teal-600 mb-4">
        {React.createElement(icon, { className: "group-hover:scale-110 transition-transform duration-200" })}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  )
}

export default Cards

