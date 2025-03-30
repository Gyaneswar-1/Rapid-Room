

import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { MdLocationOn } from "react-icons/md"

function HotelSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="w-full max-w-md mx-auto py-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdLocationOn className="w-5 h-5 text-gray-400" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-16 py-3 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Search for hotels, locations..."
        />

        <button
          type="button"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <BiSearch className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  )
}

export default HotelSearch

