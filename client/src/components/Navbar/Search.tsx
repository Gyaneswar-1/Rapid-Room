

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearch } from "../../store/reducers/search.reducer"
import type { AppDispatch } from "../../store/store"
import { useLocation } from "react-router-dom"

function Search() {
  const dispatch: AppDispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const location = useLocation()

  // Filter options state
  const [filters, setFilters] = useState({
    destination: "Anywhere",
    date: "Any Week",
    guests: "Add Guests",
  })

  useEffect(() => {
    const tid = setTimeout(() => {
      dispatch(setSearch(searchValue))
    }, 200)
    return () => clearTimeout(tid)
  }, [searchValue, dispatch])

  // Only show on home page
  if (location.pathname !== "/home") {
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto relative ">
      {/* Main search bar */}
      <div className="flex items-center justify-center bg-white rounded-full border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 p-1">
        <input
          type="text"
          className="flex-grow px-4 py-2 text-sm bg-transparent outline-none placeholder-gray-400 rounded-full"
          placeholder="Search destinations..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center cursor-pointer px-3 py-2 mr-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>

        <button
          onClick={() => dispatch(setSearch(searchValue))}
          className="p-2 cursor-pointer bg-teal-600 rounded-full text-white hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Filter dropdown */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-10 p-4 border border-gray-200 animate-in fade-in duration-200">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <select
                className="w-full p-2 border cursor-pointer border-gray-300 rounded-md text-sm"
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
              >
                <option>Anywhere</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>North America</option>
                <option>South America</option>
                <option>Africa</option>
                <option>Australia</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">When</label>
              <select
                className="w-full cursor-pointer p-2 border border-gray-300 rounded-md text-sm"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              >
                <option>Any Week</option>
                <option>This Weekend</option>
                <option>This Month</option>
                <option>Next Month</option>
                <option>December</option>
                <option>January</option>
                <option>February</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Guests</label>
              <select
                className="w-full p-2 cursor-pointer border border-gray-300 rounded-md text-sm"
                value={filters.guests}
                onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
              >
                <option>Add Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
            <button
              className="text-sm cursor-pointer font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setFilters({ destination: "Anywhere", date: "Any Week", guests: "Add Guests" })}
            >
              Clear all
            </button>
            <button
              className="px-4 py-2 bg-teal-600 cursor-pointer text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors duration-200"
              onClick={() => setShowFilters(false)}
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search

