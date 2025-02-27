import { TfiClose } from "react-icons/tfi";
import { Country, State } from "country-state-city";
import CountrySelector from "./cardFromComponents/CountrySelector";
import { useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import {
  CiBank,
  CiCreditCard1,
  CiLocationArrow1,
  CiLocationOn,
  CiPhone,
} from "react-icons/ci";
import { FaCity } from "react-icons/fa6";
import CitySelector from "./cardFromComponents/CitySelector";
import InputField from "./cardFromComponents/InputField";
import { IconBaseProps } from "react-icons";

function CardForm({ show }: { show: (value: boolean) => void }) {
  const countries = Country.getAllCountries();
  const state = State.getAllStates();
  console.log(countries);
  // const [selectedISO, setSelectedISO] = useState<string>("");
  // console.log(selectedISO);

  return (
    <div className="fixed inset-0 w-full h-full z-15 flex items-center justify-center bg-opacity-50 backdrop-brightness-70 backdrop-blur-[2px]">
      <div className="w-full mx-2 md:mx-0 md:w-fit md:h-fit md:p-8 px-4 py-4 rounded-xl border-2 border-neutral-500 bg-neutral-50">
        <div className="flex md:flex-row flex-col">
          <button
            className="cursor-pointer h-fit w-fit p-2 mb-2 bg-black rounded-md text-white"
            onClick={() => show(false)}
          >
            <TfiClose />
          </button>
          <h1 className="text-2xl font-semibold pb-7 w-full flex justify-center mr-[26px]">
            Basic Info
          </h1>
        </div>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputField title={"Phone No"} placeholder={"+91 234 234 54"} logo={CiPhone} register={() => {}} errors={{}} name={""}/>
            <InputField title={"Gov ID"} placeholder={"id number"} logo={CiCreditCard1} register={() => {}} errors={{}} name={""} />

            <h1>Address: </h1>
            <div className="country-and-states flex  md:flex-row flex-col gap-2 my-2">
              <CountrySelector props={countries} />
              <CountrySelector props={countries} />
            </div>
            <CitySelector CountryIsoCode="IN" StateIsoCode="OR" />
            <div>
              <InputField title={"zip code"} placeholder={"eg. 233445"} logo={CiLocationArrow1} register={() => {}} errors={{}} name={""}  />
              <InputField title={"Street"} placeholder={"eg. 256 bulivad"} logo={CiLocationOn} register={() => {}} errors={{}} name={""} />
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
