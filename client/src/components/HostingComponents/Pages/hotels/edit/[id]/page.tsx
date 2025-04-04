"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { notifySuccess, notifyError } from "@/lib/Toast"
import Navbar from "@/components/Navbar/Navbar"
import Page1 from "@/components/addHotel/Page1"
import Page2 from "@/components/addHotel/Page2"
import Page3 from "@/components/addHotel/Page3"

// Define form field types
type FormFields = {
  title: string
  description: string
  price: string
  roomNumber: string
  guests: number
  beds: number
  bathrooms: number
  amenities: string[]
  country: string
  state: string
  city: string
  street: string
  zipcode: string
  numberOfRooms: number
  type: string
  latitude: string
  longitude: string
  images: string[]
}

// Fields to validate on each page
const pageFields: { [key: number]: Array<keyof FormFields> } = {
  1: ["title", "description", "price", "roomNumber"],
  2: ["amenities"],
  3: ["country", "state", "city", "zipcode", "type", "images"],
}

export default function EditHotelPage() {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const hotelId = params.id as string

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onChange",
  })

  // Fetch hotel data
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setIsLoading(true)
        // In a real app, you would fetch the hotel data from an API
        // For now, we'll use mock data
        const mockHotelData = {
          title: "Sunset Beach Resort",
          description: "A beautiful beachfront resort with stunning sunset views.",
          price: "120",
          roomNumber: "301",
          guests: 2,
          beds: 1,
          bathrooms: 1,
          amenities: ["Wifi", "TV", "Kitchen", "Pool"],
          country: "Indonesia",
          state: "Bali",
          city: "Kuta",
          street: "Beach Road",
          zipcode: "80361",
          numberOfRooms: 12,
          type: "BEACH",
          latitude: "-8.7095",
          longitude: "115.1781",
          images: ["/placeholder.svg?height=120&width=200"],
        }

        // Set form values
        reset(mockHotelData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching hotel data:", error)
        notifyError("Failed to load hotel data")
        setIsLoading(false)
      }
    }

    fetchHotelData()
  }, [hotelId, reset])

  const onSubmit = (data: FormFields) => {
    console.log("Updated hotel data:", data)
    notifySuccess("Hotel updated successfully!")
    // In a real app, you would make an API call to update the hotel
    setTimeout(() => {
      router.push("/host/hotels")
    }, 2000)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar show={false} />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-32">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Page title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Edit Hotel: {watch("title")}</h1>
          <p className="text-gray-600 mt-2">Step {page} of 3</p>
        </div>

        {/* Add id to the form so we can reference it from the submit button */}
        <form id="hotel-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Show different page content based on current page */}
          {page === 1 && <Page1 register={register} errors={errors} watch={watch} />}
          {page === 2 && <Page2 register={register} errors={errors} setValue={setValue} />}
          {page === 3 && <Page3 register={register} errors={errors} setValue={setValue} />}
        </form>
      </div>

      {/* Navigation footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-gray-700 font-medium">
              {page === 1 ? "Basic Details" : page === 2 ? "Amenities" : "Location & Photos"}
            </div>
            <div className="flex space-x-4">
              {/* Previous button */}
              {page > 1 && (
                <button
                  type="button"
                  onClick={prevPage}
                  className="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                >
                  Previous
                </button>
              )}

              {/* Cancel button */}
              <button
                type="button"
                onClick={() => router.push("/host/hotels")}
                className="py-2.5 px-6 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              >
                Cancel
              </button>

              {/* Next button */}
              {page < 3 && (
                <button
                  type="button"
                  onClick={nextPage}
                  className="py-2.5 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
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
                  className={`py-2.5 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Hotel"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

