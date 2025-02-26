import { TfiClose } from "react-icons/tfi";
import { Country, State } from "country-state-city";
import CountrySelector from "./cardFromComponents/CountrySelector";
import { useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import {
  CiBank,
  CiCreditCard1,
  CiLocationArrow1,
  CiPhone,
} from "react-icons/ci";
import { FaCity } from "react-icons/fa6";

function CardForm({ show }: { show: (value: boolean) => void }) {
  const countries = Country.getAllCountries();
  const state = State.getAllStates();
  console.log(countries);
  // const [selectedISO, setSelectedISO] = useState<string>("");
  // console.log(selectedISO);

  return (
    <div className="fixed inset-0 w-full h-full z-15 flex items-center justify-center bg-opacity-50 backdrop-brightness-70 backdrop-blur-[2px]">
      <div className="w-full mx-2 md:mx-0 md:w-fit md:h-fit p-8 rounded-xl border-2 border-neutral-500 bg-neutral-50">
        <div className="flex md:flex-row flex-col">
          <button
            className="cursor-pointer h-fit w-fit p-2 mb-2 bg-black rounded-md text-white"
            onClick={() => show(false)}
          >
            <TfiClose />
          </button>
          <h1 className="text-2xl font-semibold pb-7 w-full flex justify-center mr-[26px]">Basic Info</h1>
        </div>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="UserEmail"
                className="block text-md font-medium text-gray-700 "
              >
                Phone No
              </label>
              <div className="flex items-center mt-1 p-2  w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm  focus-within:border focus-within:border-neutral-950">
                <CiPhone className="mx-1 mr-3 text-black text-xl" />
                <input
                  type="text"
                  id="UserEmail"
                  placeholder="+91 234 234 54"
                  className="w-full outline-none "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="GovID"
                className="block text-md font-medium text-gray-700"
              >
                Gov ID
              </label>
              <div className="flex items-center mt-1 p-2  w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
                <CiCreditCard1 className="mx-1 mr-3 text-black text-xl" />
                <input
                  type="text"
                  id="UserEmail"
                  placeholder="id number"
                  className="w-full outline-none"
                />
              </div>
            </div>

            <h1>Address: </h1>
            <div className="country-and-states flex  md:flex-row flex-col gap-2 my-2">
              <CountrySelector props={countries} />
              <CountrySelector props={countries} />
            </div>
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
            <div>
              <label
                htmlFor="GovID"
                className="block text-md font-medium text-gray-700"
              >
                zip code
              </label>
              <div className="flex items-center mt-1 p-2  w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border-neutral-950">
                <CiLocationArrow1 className="mx-1 mr-3 text-black text-xl" />
                <input
                  type="text"
                  id="UserEmail"
                  placeholder="eg. 233445"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div className="bg-teal-600 text-white cursor-pointer py-1 flex justify-center items-center mt-5 rounded-md border-2 border-neutral-400">
              <button type="submit" className="text-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
