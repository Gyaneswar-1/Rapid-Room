"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { notifySuccess, notifyError } from "../lib/Toast"
import Navbar from "../components/Navbar/Navbar"
import Page1 from "../components/addHotel/Page1"
import Page2 from "../components/addHotel/Page2"
import Page3 from "../components/addHotel/Page3"

// Define form field types
type FormFields = {
  title: string;
  description: string;
  price: string;
  roomNumber: string;
  guests: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  country: string;
  state: string;
  city: string;
  street: string;
  zipcode: string;
  numberOfRooms: number;
  type: string;
  latitude: string;
  longitude: string;
  images: any[];
};

// Fields to validate on each page
const pageFields: { [key: number]: Array<keyof FormFields> } = {
  1: ["title", "description", "price", "roomNumber"],
  2: ["amenities"],
  3: ["country", "state", "city", "zipcode", "type"]
}

const AddHotels = () => {
  const [page, setPage] = useState(1)
  
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Basic info
      title: "",
      description: "",
      price: "",
      roomNumber: "",
      guests: 1,
      beds: 1,
      bathrooms: 1,
      
      // Amenities
      amenities: [],
      
      // Location
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      numberOfRooms: 1,
      type: "",
      latitude: "",
      longitude: "",
      images: []
    },
  })

  const onSubmit = (data: any) => {
    console.log("Hotel data:", data)
    notifySuccess("Hotel added successfully!")
  }

  // Validate current page before moving to next
  const nextPage = async () => {
    const fieldsToValidate = pageFields[page]
    const isValid = await trigger(fieldsToValidate)
    
    if (isValid) {
      setPage((prev) => prev + 1)
      window.scrollTo(0, 0) // Scroll to top
    } else {
      notifyError("Please fix the errors before continuing")
    }
  }

  const prevPage = () => {
    setPage((prev) => prev - 1)
    window.scrollTo(0, 0) // Scroll to top
  }

  // Progress percentage for progress bar
  const progressPercentage = ((page - 1) / 2) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar show={false}/>

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-32">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Add id to the form so we can reference it from the submit button */}
        <form id="hotel-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Show different page content based on current page */}
          {page === 1 && <Page1 register={register} errors={errors} watch={watch} />}
          {page === 2 && <Page2 register={register} errors={errors} />}
          {page === 3 && <Page3 register={register} errors={errors} />}
        </form>
      </div>

      {/* Navigation footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-gray-700 font-medium">Step {page} of 3</div>
            <div className="flex space-x-4">
              {/* Previous button */}
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="py-2 px-6 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              
              {/* Next button */}
              {page < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="py-2 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Next
                </button>
              )}
              
              {/* Submit button - connect to the form using the form attribute */}
              {page === 3 && (
                <button
                  type="submit"
                  form="hotel-form" // This connects the button to the form
                  disabled={isSubmitting}
                  className={`py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
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