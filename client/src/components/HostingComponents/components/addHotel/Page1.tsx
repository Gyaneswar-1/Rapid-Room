"use client"

import type React from "react"

import { useState } from "react"
import { BiBuilding, BiDollar, BiUser, BiBed, BiBath } from "react-icons/bi"

const Page1 = ({ register, errors, watch }: { register: any; errors: any; watch: any }) => {
  const [description, setDescription] = useState("")
  const maxDescriptionLength = 500

  // Watch price field to format it
  const price = watch("price")

  // Handle description change with character limit
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxDescriptionLength) {
      setDescription(value)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Tell us about your hotel</h1>

        <div className="space-y-6">
          {/* Hotel Name */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuilding className="w-5 h-5 text-teal-600" />
              Hotel Name
            </label>
            <input
              {...register("title", {
                required: "Hotel name is required",
                minLength: {
                  value: 5,
                  message: "Hotel name must be at least 5 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Hotel name must be less than 100 characters",
                },
              })}
              type="text"
              placeholder="e.g. Sunset Beach Resort"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuilding className="w-5 h-5 text-teal-600" />
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
                maxLength: {
                  value: maxDescriptionLength,
                  message: `Description must be less than ${maxDescriptionLength} characters`,
                },
              })}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe your hotel, its location, amenities, and what makes it special..."
              rows={5}
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            <div className="mt-1 flex justify-between items-center">
              <p className={`text-sm ${errors.description ? "text-red-600" : "text-gray-500"}`}>
                {errors.description ? errors.description.message : "Be descriptive to attract more guests"}
              </p>
              <p className="text-sm text-gray-500">
                {description.length}/{maxDescriptionLength}
              </p>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiDollar className="w-5 h-5 text-teal-600" />
              Price per Night
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                {...register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid number",
                  },
                  min: {
                    value: 1,
                    message: "Price must be at least $1",
                  },
                })}
                type="text"
                placeholder="e.g. 120"
                className="w-full pl-8 p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>

          {/* Room Number */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuilding className="w-5 h-5 text-teal-600" />
              Room Number
            </label>
            <input
              {...register("roomNumber", {
                required: "Room number is required",
              })}
              type="text"
              placeholder="e.g. 101"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.roomNumber && <p className="mt-1 text-sm text-red-600">{errors.roomNumber.message}</p>}
          </div>

          {/* Guest Capacity, Beds, and Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guest Capacity */}
            <div>
              <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
                <BiUser className="w-5 h-5 text-teal-600" />
                Max Guests
              </label>
              <select
                {...register("guests", {
                  required: "Guest capacity is required",
                })}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
              {errors.guests && <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>}
            </div>

            {/* Beds */}
            <div>
              <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
                <BiBed className="w-5 h-5 text-teal-600" />
                Beds
              </label>
              <select
                {...register("beds", {
                  required: "Number of beds is required",
                })}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Bed" : "Beds"}
                  </option>
                ))}
              </select>
              {errors.beds && <p className="mt-1 text-sm text-red-600">{errors.beds.message}</p>}
            </div>

            {/* Bathrooms */}
            <div>
              <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
                <BiBath className="w-5 h-5 text-teal-600" />
                Bathrooms
              </label>
              <select
                {...register("bathrooms", {
                  required: "Number of bathrooms is required",
                })}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Bathroom" : "Bathrooms"}
                  </option>
                ))}
              </select>
              {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page1

