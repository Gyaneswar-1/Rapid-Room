"use client"

import Navbar from "../components/Navbar/Navbar"
import Page1 from "../components/addHotel/Page1"
import Page2 from "../components/addHotel/Page2"
import Page3 from "../components/addHotel/Page3"
import { useState } from "react"
import { useForm } from "react-hook-form"


const AddHotels = () => {
  const [page, setPage] = useState(1)
  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors, isValid },
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: "",
      roomNumber: "",
      guests: 1,
      beds: 1,
      bathrooms: 1,
      amenities: [],
      state: "Odisha",
      street: "nh45",
      numberOfRooms: 10,
      city: "Cuttack",
      zipcode: "755049",
      country: "Japan",
      images: [],
      type: "CITY",
      longitude: "",
      latitude: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data)
    alert("Form submitted successfully! Check console for data.")
  }

  const nextPage = () => setPage((prev) => prev + 1)
  const prevPage = () => setPage((prev) => prev - 1)

  // Progress percentage calculation
  const progressPercentage = ((page - 1) / 2) * 100

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <Navbar show={false}/>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
          <div className="flex-grow">
            {page === 1 && <Page1 register={register} errors={errors} watch={watch} />}
            {page === 2 && <Page2 register={register} errors={errors} />}
            {page === 3 && <Page3 register={register} errors={errors} />}
          </div>
        </form>
      </div>

      {/* Fixed navigation footer */}
      <div className="fixed bottom-0 left-0 w-full z-10 bg-white border-t border-gray-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-gray-700 font-medium">Step {page} of 3</div>
            <div className="flex space-x-4">
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="py-2 px-6 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Previous
                </button>
              )}
              {page < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="py-2 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Next
                </button>
              )}
              {page === 3 && (
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHotels

