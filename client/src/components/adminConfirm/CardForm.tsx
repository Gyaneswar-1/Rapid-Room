"use client"

import { TfiClose } from "react-icons/tfi"
import { Country } from "country-state-city"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { notifyInfo } from "../../lib/Toast"
import { applyAdmin } from "../../service/admin.service"
import { motion } from "framer-motion"
import { CiCreditCard1, CiLocationArrow1, CiLocationOn, CiPhone } from "react-icons/ci"

import StateSelector from "./cardFromComponents/StateSelector"
import CitySelector from "./cardFromComponents/CitySelector"
import InputField from "./cardFromComponents/InputField"
import CountrySelector from "./cardFromComponents/CountrySelector"

type Inputs = {
  phoneNumber: string
  govID: number
  country: string
  state: string
  city: string
  zip: number
  street: string
}

function CardForm({ show }: { show: (value: boolean) => void }) {
  const countries = Country.getAllCountries()
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true)
    setTimeout(() => {
      applyAdmin(data)
      navigate("/home")
      notifyInfo("Thanks for registering yourself")
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
      >
        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Basic Info</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              onClick={() => show(false)}
              aria-label="Close"
            >
              <TfiClose className="w-4 h-4" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              title="Phone Number"
              placeholder="+91 234 234 54"
              logo={CiPhone}
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
                    message: "Phone number must be exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be exactly 10 digits",
                  },
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone number must be exactly 10 digits",
                  },
                }),
              }}
              errorsFor={errors.phoneNumber}
            />

            <InputField
              title="Government ID"
              placeholder="ID number"
              logo={CiCreditCard1}
              name="govID"
              type="text"
              registerValue={{
                ...register("govID", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                }),
              }}
              errorsFor={errors.govID}
            />

            <div className="pt-2">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <CountrySelector
                  countries={countries}
                  setCountry={setCountry}
                  register={register}
                  setValue={setValue}
                />
                <StateSelector setState={setState} countryCode={country} register={register} setValue={setValue} />
              </div>

              <CitySelector CountryIsoCode={country} StateIsoCode={state} register={register} setValue={setValue} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <InputField
                  title="Zip Code"
                  placeholder="e.g., 233445"
                  logo={CiLocationArrow1}
                  name="zip"
                  type="number"
                  registerValue={{
                    ...register("zip", {
                      required: {
                        value: true,
                        message: "This field is required",
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
                  placeholder="e.g., 256 Boulevard"
                  logo={CiLocationOn}
                  name="street"
                  type="text"
                  registerValue={{
                    ...register("street", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }),
                  }}
                  errorsFor={errors.street}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 rounded-lg font-medium text-white transition-all ${
                loading ? "bg-teal-500/70 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 shadow-md"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div
                    className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Submit"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default CardForm


// import { TfiClose } from "react-icons/tfi";
// import { Country } from "country-state-city";
// import CountrySelector from "./cardFromComponents/CountrySelector";
// import { useState } from "react";
// import {
//   CiCreditCard1,
//   CiLocationArrow1,
//   CiLocationOn,
//   CiPhone,
// } from "react-icons/ci";
// import {motion} from "motion/react"
// import CitySelector from "./cardFromComponents/CitySelector";
// import InputField from "./cardFromComponents/InputField";
// import StateSelector from "./cardFromComponents/StateSelector";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { notifyInfo } from "../../lib/Toast";
// import { applyAdmin } from "../../service/admin.service";

// type Inputs = {
//   phoneNumber: string;
//   govID: number;
//   country: string;
//   state: string;
//   city: string;
//   zip: number;
//   street: string;
// };

// function CardForm({ show }: { show: (value: boolean) => void }) {
//   const countries = Country.getAllCountries();
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [loading, setLoading] = useState(false);
//   const naviagte = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     setLoading(!loading);
//     setTimeout(() => {
//       applyAdmin(data);
//       naviagte("/home");
//       notifyInfo("Thanks for registering yourself");
//     }, 3000);
//   };

//   return (
//     <div className="fixed inset-0 w-full h-full z-15 flex items-center justify-center bg-opacity-50 backdrop-brightness-70 backdrop-blur-[2px]">
//       <div className="w-full mx-2 md:mx-0 md:w-fit md:h-fit md:p-8 px-4 py-4 rounded-xl border-2 border-neutral-500 bg-neutral-50">
//         <div className="flex md:flex-row flex-col">
//           <motion.button
//           whileHover={{
//             scale:1.08
//           }}
//           whileTap={{
//             scale:0.91
//           }}
//             className="cursor-pointer h-fit w-fit p-2 mb-2 bg-black rounded-md text-white"
//             onClick={() => show(false)}
//           >
//             <TfiClose />
//           </motion.button>
//           <h1 className="text-2xl font-semibold pb-7 w-full flex justify-center mr-[26px]">
//             Basic Info
//           </h1>
//         </div>

//         <div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <InputField
//               title="Phone No"
//               placeholder="+91 234 234 54"
//               logo={CiPhone}
//               errors={errors}
//               name="phoneNumber"
//               type="number"
//               registerValue={{
//                 ...register("phoneNumber", {
//                   required: {
//                     value: true,
//                     message: "Phone number is required",
//                   },
//                   minLength: {
//                     value: 10,
//                     message: "Ph number must be exactly 10 digits",
//                   },
//                   maxLength: {
//                     value: 10,
//                     message: "Ph number must be exactly 10 digits",
//                   },
//                   pattern: {
//                     value: /^\d{10}$/,
//                     message: "Ph number must be exactly 10 digits",
//                   },
//                 }),
//               }}
//               errorsFor={errors.phoneNumber}
//             />

//             <InputField
//               title="Gov ID"
//               placeholder="ID number"
//               logo={CiCreditCard1}
//               errors={errors}
//               name="govID"
//               type="text"
//               registerValue={{
//                 ...register("govID", {
//                   required: {
//                     value: true,
//                     message: "This field is required",
//                   },
//                 }),
//               }}
//               errorsFor={errors.govID}
//             />

//             <h1>Address:</h1>
//             <div className="country-and-states flex md:flex-row flex-col gap-2 my-2">
//               <CountrySelector
//                 countries={countries}
//                 setCountry={setCountry}
//                 register={register}
//                 setValue={setValue}
//               />
//               <StateSelector
//                 setState={setState}
//                 countryCode={country}
//                 register={register}
//                 setValue={setValue}
//               />
//             </div>
//             <CitySelector
//               CountryIsoCode={country}
//               StateIsoCode={state}
//               register={register}
//               setValue={setValue}
//             />

//             <div>
//               <InputField
//                 title="Zip Code"
//                 placeholder="eg. 233445"
//                 logo={CiLocationArrow1}
//                 errors={errors}
//                 name="zip"
//                 type="number"
//                 registerValue={{
//                   ...register("zip", {
//                     required: {
//                       value: true,
//                       message: "this field is required",
//                     },
//                     minLength: {
//                       value: 6,
//                       message: "Must be exactly 6 digits",
//                     },
//                     maxLength: {
//                       value: 6,
//                       message: "Must be exactly 6 digits",
//                     },
//                     pattern: {
//                       value: /^\d{6}$/,
//                       message: "Must be exactly 6 digits",
//                     },
//                   }),
//                 }}
//                 errorsFor={errors.zip}
//               />
//               <InputField
//                 title="Street"
//                 placeholder="eg. 256 Boulevard"
//                 logo={CiLocationOn}
//                 errors={errors}
//                 name="street"
//                 type="text"
//                 registerValue={{
//                   ...register("street", {
//                     required: {
//                       value: true,
//                       message: "this field is required",
//                     },
//                   }),
//                 }}
//                 errorsFor={errors.zip}
//               />
//             </div>
//             {loading ? (
//               <button
//                 className="w-full bg-teal-600 text-white  py-1 flex justify-center items-center mt-5 rounded-md border opacity-55 border-neutral-700 text-lg w-fill h-full cursor-not-allowed "
//               >
//                 <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-neutral-50  rounded-full" role="status" aria-label="loading">
//   <span className="sr-only">Loading...</span>
// </div>
//               </button>
//             ) : (
//               < motion.button
//               whileHover={{
//                 scale:1.02
//               }}
//               whileTap={{
//                 scale:0.95
//               }}
//                 type="submit"
//                 className="w-full bg-teal-600 text-white  py-1 flex justify-center items-center mt-5 rounded-md border border-neutral-900 text-lg w-fill h-full cursor-pointer opacity-100"
//              >
//                 Submit
//               </ motion.button>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CardForm;
