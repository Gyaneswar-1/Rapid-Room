"use client"

import { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { setSearch } from "../../store/reducers/search.reducer"
import type { AppDispatch } from "../../store/store"
import { useLocation } from "react-router-dom"
import { FaRegCalendarAlt } from "react-icons/fa"

function Search() {
  const dispatch: AppDispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("")
  const location = useLocation()

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
    <div className="w-full md:w-auto">
      <div className="flex items-center border border-gray-200 rounded-full shadow-sm hover:shadow-md transition py-2 md:py-1.5">
        <div className="hidden sm:block px-4 text-sm font-medium border-r border-gray-200">Anywhere</div>

        <div className="hidden sm:flex items-center px-4 text-sm font-medium border-r border-gray-200">
          <FaRegCalendarAlt className="mr-2 text-gray-400" size={14} />
          Any Week
        </div>

        <div className="flex items-center pl-4 pr-2 flex-1">
          <input
            type="text"
            className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
            placeholder="Search destinations"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            onClick={() => dispatch(setSearch(searchValue))}
            className="p-2 bg-teal-600 rounded-full text-white ml-2 hover:bg-teal-700 transition focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <BiSearch size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search

