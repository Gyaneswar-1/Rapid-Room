import { motion } from "framer-motion";
import React from "react";
import { BiDownArrow } from "react-icons/bi";

interface CountryData {
  name: string;
  flag: string;
  isoCode: string;
}

interface SelectorProps {
  props: CountryData[];
}

const CountrySelector: React.FC<SelectorProps> = ({ props }:SelectorProps) => {
  const [showCountry, setShowCountry] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<CountryData | null>(null);

  function handleSelect(country: CountryData) {
    setSelectedCountry(country);
    setShowCountry(false); 
    console.log("Selected",selectedCountry);
    console.log(selectedCountry?.flag);
    console.log(selectedCountry?.isoCode);
    console.log(selectedCountry?.name);
}

  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <div
          onClick={() => setShowCountry(!showCountry)}
          className="border-e px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
        >
          {selectedCountry ? (
            <>
              {selectedCountry.flag} {selectedCountry.name}
            </>
          ) : (
            "Select your country"
          )}
        </div>

        <button
          onClick={() => setShowCountry(!showCountry)}
          className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          type="button"
        >
          <BiDownArrow />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{
          opacity: showCountry ? 1 : 0,
          y: showCountry ? 0 : -10,
          scale: showCountry ? 1 : 0.95,
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg 
          max-h-60 overflow-y-auto backdrop-blur-md ${!showCountry && "hidden"}`}
        role="menu"
      >
        {showCountry && (
          <div className="p-2">
            {props.map((data, index) => (
              <div
                key={index}
                onClick={() => handleSelect(data)}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                role="menuitem"
              >
                {data.flag} {data.name}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CountrySelector;
