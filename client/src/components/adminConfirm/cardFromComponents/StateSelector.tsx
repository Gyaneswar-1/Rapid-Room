import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { State } from "country-state-city";

interface StateData {
  name: string;
  isoCode: string;
}

interface Selectorstate {
  setState: (state: string) => void;
  countryCode: string;
  register: any;
}

function StateSelector({ setState, countryCode, register }: Selectorstate) {
  const state = State.getStatesOfCountry(countryCode);
  console.log(state);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<StateData[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle input change and filter countries
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredCountries([]);
      setShowDropdown(false);
    } else {
      const filtered = state.filter((state) =>
        state.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCountries(filtered);
      setShowDropdown(filtered.length > 0);
    }
  };

  // Select state and close dropdown
  const handleSelect = (state: StateData) => {
    setSelectedState(state);
    setState(state.isoCode);
    setSearch(state.name);
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
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
        Select State
      </label>
      <div className="flex items-center mt-1 p-2 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
        <input
          {...register("state")}
          type="text"
          placeholder="Search state"
          className="w-full outline-none"
          value={search}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(filteredCountries.length > 0)}
        />
      </div>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg"
        >
          {filteredCountries.map((state, index) => (
            <div
              key={index}
              onClick={() => handleSelect(state)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {state.name}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default StateSelector;
