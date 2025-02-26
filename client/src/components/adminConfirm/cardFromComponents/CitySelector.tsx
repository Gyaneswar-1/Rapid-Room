import { City } from "country-state-city";
import React from "react";
import { CiBank } from "react-icons/ci";

interface CountryData {
  CountryIsoCode: string;
  StateIsoCode: string;
}

const CitySelector: React.FC<CountryData> = ({
  CountryIsoCode,
  StateIsoCode,
}) => {
  const citiesOfOdisha = City.getCitiesOfState(CountryIsoCode, StateIsoCode);

  console.log(citiesOfOdisha);

  return (
    <div className="relative">
      <div>
        <label
          htmlFor="GovID"
          className="block text-md font-medium text-gray-700"
        >
          City name
        </label>
        <div className="flex items-center mt-1 p-2  w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
          <CiBank className="mx-1 mr-3 text-black text-xl" />
          <input
            type="text"
            id="UserEmail"
            placeholder="city name"
            className="w-full outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
