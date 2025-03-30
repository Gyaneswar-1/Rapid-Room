

import { useState, useEffect } from "react"
import { BiMinus,BiPlus } from "react-icons/bi";

const Page1 = ({ register, errors, watch }: { register: any; errors: any; watch: any }) => {
  const [guests, setGuests] = useState(1)
  const [beds, setBeds] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)

  const title = watch("title") || ""
  const description = watch("description") || ""

  // Update form values when counter changes
  useEffect(() => {
    register("guests", { value: guests })
    register("beds", { value: beds })
    register("bathrooms", { value: bathrooms })
  }, [guests, beds, bathrooms, register])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Describe your hotel</h1>

        {/* Hotel Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-900 mb-2">
            Hotel Title
          </label>
          <input
            id="title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 24,
                message: "Title must be less than 24 characters",
              },
            })}
            type="text"
            placeholder="Short title works best"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          />
          <div className="flex justify-between mt-2">
            <p className={`text-sm ${errors.title ? "text-red-600" : "text-gray-500"}`}>
              {errors.title ? errors.title.message : ""}
            </p>
            <p className="text-sm text-gray-500">{title.length}/24</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <label htmlFor="description" className="block text-lg font-medium text-gray-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
              },
            })}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            rows={4}
            placeholder="Share what makes your hotel special"
          ></textarea>
          <div className="flex justify-between mt-2">
            <p className={`text-sm ${errors.description ? "text-red-600" : "text-gray-500"}`}>
              {errors.description ? errors.description.message : ""}
            </p>
            <p className="text-sm text-gray-500">{description.length}/500</p>
          </div>
        </div>

        {/* Price and Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-900 mb-2">
              Price per night
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                id="price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 1, message: "Price must be greater than 0" },
                })}
                type="number"
                placeholder="99"
                className="block w-full p-3 pl-8 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          <div>
            <label htmlFor="roomNumber" className="block text-lg font-medium text-gray-900 mb-2">
              Number of rooms
            </label>
            <input
              id="roomNumber"
              {...register("roomNumber", {
                required: "Number of rooms is required",
                min: { value: 1, message: "Must have at least 1 room" },
              })}
              type="number"
              placeholder="10"
              className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.roomNumber && <p className="mt-1 text-sm text-red-600">{errors.roomNumber.message}</p>}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>

          {/* Guests */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div>
              <h3 className="font-medium text-gray-900">Guests</h3>
              <p className="text-sm text-gray-500 mt-1">How many guests can stay?</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
              >
                <BiMinus className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium w-8 text-center">{guests}</span>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setGuests((prev) => prev + 1)}
              >
                <BiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Beds */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div>
              <h3 className="font-medium text-gray-900">Beds</h3>
              <p className="text-sm text-gray-500 mt-1">How many beds are available?</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setBeds((prev) => Math.max(1, prev - 1))}
              >
                <BiMinus className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium w-8 text-center">{beds}</span>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setBeds((prev) => prev + 1)}
              >
                <BiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-gray-900">Bathrooms</h3>
              <p className="text-sm text-gray-500 mt-1">How many bathrooms are available?</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setBathrooms((prev) => Math.max(1, prev - 1))}
              >
                <BiMinus className="w-5 h-5" />
              </button>
              <span className="text-lg font-medium w-8 text-center">{bathrooms}</span>
              <button
                type="button"
                className="p-2 rounded-full border border-gray-300 text-teal-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
                onClick={() => setBathrooms((prev) => prev + 1)}
              >
                <BiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page1

