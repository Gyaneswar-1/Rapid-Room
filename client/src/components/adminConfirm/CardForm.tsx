import React from "react";
import { TfiClose } from "react-icons/tfi";
import { Country, State, City } from "country-state-city";
import { BiDownArrow } from "react-icons/bi";
import { motion } from "framer-motion";

function CardForm({ show }: { show: any }) {
  const [showCountry, setShowCountry] = React.useState(false);
  const countries = Country.getAllCountries();
  const states = State.getAllStates()

  const filteredStates = states.filter((state) => state.countryCode === "IN");
  console.log(filteredStates);
  
  // console.log(states)
  return (
    <div className="fixed inset-0 w-full h-full z-15  flex items-center justify-center  bg-opacity-50 backdrop-brightness-70 backdrop-blur-[2px] ">
      <div className="w-fit h-fit p-8 rounded-xl border-2 border-neutral-500 bg-neutral-50">
        <button
          className="cursor-pointer p-2 mb-2 bg-black  rounded-md text-white"
          onClick={() => {
            show(false);
          }}
        >
          <TfiClose />
        </button>

        <div>
          <h1 className="text-xl pb-7">basic info</h1>
          <form action="">
            <div>
              <label
                htmlFor="UserEmail"
                className="block text-md font-medium text-gray-700"
              >
                {" "}
                Phone No{" "}
              </label>

              <input
                type="email"
                id="UserEmail"
                placeholder="+91&ensp;234&ensp;234&ensp;54"
                className="mt-1 p-2 px-5 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="UserEmail"
                className="block text-md font-medium text-gray-700"
              >
                Gov ID
              </label>

              <input
                type="email"
                id="UserEmail"
                placeholder="id number"
                className="mt-1 p-2 px-5 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm"
              />
            </div>
            {/* Countries */}

            <div className="relative">
              <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                <div
                  onClick={() => {
                    setShowCountry(!showCountry);
                  }}
                  className="border-e px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                  Country
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
              max-h-60 overflow-y-auto backdrop-blur-md ${
                !showCountry && "hidden"
              }`}
                role="menu"
              >
                {showCountry && (
                  <div className="p-2">
                    {countries.map((data, index) => (
                      <div
                        key={index}
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
            <div className="relative">
              <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                <div
                  onClick={() => {
                    setShowCountry(!showCountry);
                  }}
                  className="border-e px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                  Country
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
              max-h-60 overflow-y-auto backdrop-blur-md ${
                !showCountry && "hidden"
              }`}
                role="menu"
              >
                {showCountry && (
                  <div className="p-2">
                    {states.filter((data)=> data.countryCode === "IND").map((data,index)=>{
                      return(
                        <div key={index}>
                          {data.name}
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
