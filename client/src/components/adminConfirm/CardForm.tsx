import { TfiClose } from "react-icons/tfi";
import { Country } from "country-state-city";
import CountrySelector from "./cardFromComponents/CountrySelector";
import { useState } from "react";
import {
  CiCreditCard1,
  CiLocationArrow1,
  CiLocationOn,
  CiPhone,
} from "react-icons/ci";
import CitySelector from "./cardFromComponents/CitySelector";
import InputField from "./cardFromComponents/InputField";
import StateSelector from "./cardFromComponents/StateSelector";
import { useForm, SubmitHandler } from "react-hook-form";
import { tuple } from "zod";

type Inputs = {
  phoneNumber: string;
  govID: number;
  country: string;
  state: string;
  city: string;
  zip: number;
  street: string;
};

function CardForm({ show }: { show: (value: boolean) => void }) {
  const countries = Country.getAllCountries();
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              title="Phone No"
              placeholder="+91 234 234 54"
              logo={CiPhone}
              errors={errors}
              name="phoneNumber"
              type="number"
              registerValue={{
                ...register("phoneNumber", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                  minLength: {
                    value: 10,
                    message: "Ph number must be exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Ph number must be exactly 10 digits",
                  },
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Ph number must be exactly 10 digits",
                  },
                }),
              }}
              errorsFor={errors.phoneNumber}
            />

            <InputField
              title="Gov ID"
              placeholder="ID number"
              logo={CiCreditCard1}
              errors={errors}
              name="govID"
              type="text"
              registerValue={{
                ...register("govID",{
                  required:{
                    value: true,
                    message: "This field is required"
                  }
                })
              }}
              errorsFor={errors.govID}
            />

            <h1>Address:</h1>
            <div className="country-and-states flex md:flex-row flex-col gap-2 my-2">
              <CountrySelector
                countries={countries}
                setCountry={setCountry}
                register={register}
              />
              <StateSelector
                setState={setState}
                countryCode={country}
                register={register}
              />
            </div>
            <CitySelector
              CountryIsoCode={country}
              StateIsoCode={state}
              register={register}
            />

            <div>
              <InputField
                title="Zip Code"
                placeholder="eg. 233445"
                logo={CiLocationArrow1}
                errors={errors}
                name="zip"
                type="number"
              registerValue={{
                ...register("zip", {
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be exactly 6 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "Must be exactly 6 digits",
                  },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Must be exactly 6 digits",
                  },
                }),
              }}
              errorsFor={errors.zip}
              />
              <InputField
                title="Street"
                placeholder="eg. 256 Boulevard"
                logo={CiLocationOn}
                errors={errors}
                name="street"
                type="text"
              registerValue={{
                ...register("street", {
                  required: {
                    value: true,
                    message: "this field is required",
                  },
                  
                }),
              }}
              errorsFor={errors.zip}
              />
            </div>

            <div className="bg-teal-600 text-white cursor-pointer py-1 flex justify-center items-center mt-5 rounded-md border-2 border-neutral-400">
              {/* <button type="submit" className="text-lg">
                Submit
              </button> */}
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
