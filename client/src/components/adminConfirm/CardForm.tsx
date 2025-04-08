import { TfiClose } from "react-icons/tfi"
import { Country } from "country-state-city"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { notifyError, notifyInfo } from "../../lib/Toast"
import { applyAdmin } from "../../service/admin.service"
import { motion } from "framer-motion"
import { CiCreditCard1, CiLocationArrow1, CiLocationOn, CiPhone } from "react-icons/ci"

import StateSelector from "./cardFromComponents/StateSelector"
import CitySelector from "./cardFromComponents/CitySelector"
import InputField from "./cardFromComponents/InputField"
import CountrySelector from "./cardFromComponents/CountrySelector"
import { setUserCity, setUserCountry, setUserGovId, setUserIsHost, setUserPhoneNumber, setUserState, setUserStreet, setUserZipCode, userStoreType } from "../../store/reducers/user.reducers"
import { AppDispatch, RootState } from "../../store/store"
import { useDispatch, useSelector } from "react-redux"

type Inputs = {
  phoneNumber: string
  govID: number
  country: string
  state: string
  city: string
  zip: number
  street: string
  upiId:string
}

function CardForm({ show }: { show: (value: boolean) => void }) {
   const dispatch: AppDispatch = useDispatch();

  // const {  }: userStoreType = useSelector(
  //   (state: RootState) => state.userReducer
  // );

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

  const onSubmit: SubmitHandler<Inputs> = async (data:Inputs) => {
    setLoading(true)
    console.log(data);
    
      if(await applyAdmin(data)){
        notifyInfo("Thanks for registering yourself")
        dispatch(setUserCountry(data.country))
        dispatch(setUserPhoneNumber(data.phoneNumber))
        dispatch(setUserGovId(data.govID))
        dispatch(setUserState(data.state))
        dispatch(setUserCity(data.city))
        dispatch(setUserStreet(data.street))
        dispatch(setUserZipCode(data.zip))
        dispatch(setUserIsHost(true))
      }else{
        notifyError("Somthing wrong")
      }
      navigate("/home")
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
              title="Upi id"
              placeholder="success@axis"
              logo={CiPhone}
              name="upiId"
              type="text"
              registerValue={{
                ...register("upiId", {
                  required: {
                    value: true,
                    message: "UPI ID is required",
                  },
                  minLength: {
                    value: 3,
                    message: "UPI ID must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/,
                    message: "Please enter a valid UPI ID (e.g. username@bankname)",
                  },
                }),
              }}
              errorsFor={errors.upiId}
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
                  },minLength:{
                    value:12,
                    message: "GOV ID must be at least 12 characters",
                  }
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
                loading ? "bg-primary/70 cursor-not-allowed" : "bg-primary hover:bg-primary/80 shadow-md"
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
