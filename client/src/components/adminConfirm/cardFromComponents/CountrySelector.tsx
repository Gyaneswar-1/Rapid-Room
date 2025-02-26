import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { BiDownArrow } from "react-icons/bi";

interface countryData {
  name: string;
  flag: string;
}

interface SelectorProps {
  props: countryData[];
}

function CountrySelector({ props }: SelectorProps) {
  const [showCountry, setShowCountry] = React.useState(false);
  const [selectedCountry, setSelectedCountry] =
    React.useState<countryData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSelect(country: countryData) {
    setSelectedCountry(country);
    setShowCountry(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountry(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef}>
      <div className="relative md:w-52 w-full">
        <div className="inline-flex md:w-52 w-full items-center overflow-hidden rounded-md border bg-white">
          <div
            onClick={() => {
              setShowCountry(!showCountry);
            }}
            className="border-e w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
          >
            {selectedCountry ? (
              <>
                {selectedCountry.flag} {
                  selectedCountry.name.length > 20 ? `${selectedCountry.name.substring(0,17)}..` : selectedCountry.name
                }
              </>
            ) : (
              <>Select your country</>
            )}
          </div>

          <button
            onClick={() => {
              setShowCountry(!showCountry);
            }}
            className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
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
              {props.map((data: any, index: any) => (
                <div
                  key={index}
                  onClick={() => {
                    handleSelect(data);
                  }}
                  className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  {data.flag}&ensp;{data.name}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CountrySelector;