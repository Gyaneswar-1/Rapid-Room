import { City } from "country-state-city";
import React, { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CiBank } from "react-icons/ci";

interface CountryData {
  CountryIsoCode: string;
  StateIsoCode: string;
  register: any;
  setValue:UseFormSetValue<any>
}

const CitySelector: React.FC<CountryData> = ({
  CountryIsoCode,
  StateIsoCode,
  register,
  setValue,
}) => {
  const cities = City.getCitiesOfState(CountryIsoCode, StateIsoCode) || [];
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Handle search and show only matching cities
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredCities([]);
      setDropdownOpen(false);
    } else {
      const filtered = cities
        .filter((city) => city.name.toLowerCase().includes(value.toLowerCase()))
        .map((city) => city.name);
      setFilteredCities(filtered);
      setDropdownOpen(filtered.length > 0);
    }
  };

  // Select city and close dropdown
  const handleSelectCity = (cityName: string) => {
    setSearch(cityName);
    setFilteredCities([]);
    setDropdownOpen(false);
    setValue("city",cityName)
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      <label htmlFor="city" className="block text-md font-medium text-gray-700">
        City name
      </label>
      <div className="flex items-center mt-1 p-2 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
        <CiBank className="mx-1 mr-3 text-black text-xl" />
        <input
          {...register("city")}
          type="text"
          id="city"
          placeholder="Search city"
          className="w-full outline-none"
          value={search}
          onChange={handleSearch}
          required
        />
      </div>

      {isDropdownOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 mt-1 max-h-40 overflow-y-auto shadow-lg rounded-md z-10">
          {filteredCities.map((city) => (
            <li
              key={city}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySelector;
