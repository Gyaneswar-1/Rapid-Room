

import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { UseFormSetValue } from "react-hook-form"

interface CountryData {
  name: string
  flag: string
  isoCode: string
}

interface Selectorcountries {
  countries: CountryData[]
  setCountry: (country: string) => void
  register: any
  setValue: UseFormSetValue<any>
}

function CountrySelector({ countries, setCountry, register, setValue }: Selectorcountries) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [search, setSearch] = useState("")
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim() === "") {
      setFilteredCountries([])
      setShowDropdown(false)
    } else {
      const filtered = countries.filter((country) => country.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredCountries(filtered)
      setShowDropdown(filtered.length > 0)
    }
  }

  const handleSelect = (country: CountryData) => {
    setSelectedCountry(country)
    setCountry(country.isoCode)
    setSearch(country.name)
    setValue("country", country.name)
    setShowDropdown(false)
  }

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
      <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Country</label>
      <div className="flex items-center px-3 py-2.5 w-full rounded-lg border border-gray-300 bg-white shadow-sm transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/30">
        <input
          type="text"
          placeholder="Search country"
          className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          value={search}
          {...register("country")}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(filteredCountries.length > 0)}
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
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              onClick={() => handleSelect(country)}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
            >
              <span className="mr-2">{country.flag}</span>
              <span className="text-gray-800">{country.name}</span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default CountrySelector

