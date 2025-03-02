import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form"; 

interface CountryData {
  name: string;
  flag: string;
  isoCode: string;
}

interface Selectorcountries {
  countries: CountryData[];
  setCountry: (country: string) => void;
  register: any;
  setValue: UseFormSetValue<any>; 
}

function CountrySelector({
  countries,
  setCountry,
  register,
  setValue, 
}: Selectorcountries) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredCountries([]);
      setShowDropdown(false);
    } else {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowDropdown(filtered.length > 0);
    }
  };

  const handleSelect = (country: CountryData) => {
    setSelectedCountry(country);
    setCountry(country.isoCode);
    setSearch(country.name);
    setValue("country", country.name); 
    setShowDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full md:w-52">
      <label className="block text-md font-medium text-gray-700">
        Select Country
      </label>
      <div className="flex items-center mt-1 p-2 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
        <input
          type="text"
          placeholder="Search country"
          className="w-full outline-none"
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
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg"
        >
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              onClick={() => handleSelect(country)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {country.flag}&ensp;{country.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default CountrySelector;
