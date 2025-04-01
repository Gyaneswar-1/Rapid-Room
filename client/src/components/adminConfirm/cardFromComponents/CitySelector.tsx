

import { City } from "country-state-city"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { UseFormSetValue } from "react-hook-form"
import { CiBank } from "react-icons/ci"

interface CountryData {
  CountryIsoCode: string
  StateIsoCode: string
  register: any
  setValue: UseFormSetValue<any>
}

const CitySelector: React.FC<CountryData> = ({ CountryIsoCode, StateIsoCode, register, setValue }) => {
  const cities = City.getCitiesOfState(CountryIsoCode, StateIsoCode) || []
  const [search, setSearch] = useState("")
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLDivElement>(null)

  // Handle search and show only matching cities
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim() === "") {
      setFilteredCities([])
      setDropdownOpen(false)
    } else {
      const filtered = cities
        .filter((city) => city.name.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.name)
      setFilteredCities(filtered)
      setDropdownOpen(filtered.length > 0)
    }
  }

  // Select city and close dropdown
  const handleSelectCity = (cityName: string) => {
    setSearch(cityName)
    setFilteredCities([])
    setDropdownOpen(false)
    setValue("city", cityName)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full" ref={inputRef}>
      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
        City name
      </label>
      <div className="flex items-center px-3 py-2.5 w-full rounded-lg border border-gray-300 bg-white shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-teal-500/30">
        <CiBank className="flex-shrink-0 text-gray-500 mr-2 text-xl" />
        <input
          {...register("city")}
          type="text"
          id="city"
          placeholder="Search city"
          className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          value={search}
          onChange={handleSearch}
          required
        />
      </div>

      {isDropdownOpen && (
        <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {filteredCities.map((city) => (
            <li
              key={city}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CitySelector

