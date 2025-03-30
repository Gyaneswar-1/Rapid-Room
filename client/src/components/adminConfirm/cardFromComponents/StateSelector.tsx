

import { State } from "country-state-city"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { UseFormSetValue } from "react-hook-form"

interface StateData {
  name: string
  isoCode: string
}

interface Selectorstate {
  setState: (state: string) => void
  countryCode: string
  register: any
  setValue: UseFormSetValue<any>
}

function StateSelector({ setState, countryCode, register, setValue }: Selectorstate) {
  const state = State.getStatesOfCountry(countryCode)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [search, setSearch] = useState("")
  const [filteredStates, setFilteredStates] = useState<StateData[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle input change and filter states
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim() === "") {
      setFilteredStates([])
      setShowDropdown(false)
    } else {
      const filtered = state.filter((state) => state.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredStates(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }

  // Select state and close dropdown
  const handleSelect = (state: StateData) => {
    setSelectedState(state)
    setState(state.isoCode)
    setSearch(state.name)
    setValue("state", state.name)
    setShowDropdown(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Select State</label>
      <div className="flex items-center px-3 py-2.5 w-full rounded-lg border border-gray-300 bg-white shadow-sm transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/30">
        <input
          {...register("state")}
          type="text"
          placeholder="Search state"
          className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          value={search}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(filteredStates.length > 0)}
          required
        />
      </div>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {filteredStates.map((state, index) => (
            <div
              key={index}
              onClick={() => handleSelect(state)}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {state.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default StateSelector

