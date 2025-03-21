
import type React from "react"

import { useState, useEffect } from "react"
import { BiBuildingHouse, BiHome, BiMapPin } from "react-icons/bi";
// import {
//   BiBuildingHouse,
//   BiBuildingHouse,
//   BiHome,
//   BiMapPin,
//   BiMapPin,
//   BiMapPin,
// } from "@heroicons/react/24/outline"

const Page3 = ({ register, errors }: { register: any; errors: any }) => {
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Update form values when images change
  useEffect(() => {
    register("images", { value: images })
  }, [images, register])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setImages((prevImages) => [...prevImages, ...selectedFiles])

      // Create preview URLs
      const newPreviewUrls = selectedFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls])
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index))
  }

  const hotelTypes = [
    { value: "CITY", label: "City" },
    { value: "BEACH", label: "Beach" },
    { value: "MOUNTAIN", label: "Mountain" },
    { value: "COUNTRYSIDE", label: "Countryside" },
    { value: "RESORT", label: "Resort" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Where is your hotel located?</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Country */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiMapPin className="w-5 h-5 text-teal-600" />
              Country
            </label>
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              placeholder="e.g. Japan"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
          </div>

          {/* State */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              State/Province
            </label>
            <input
              {...register("state", { required: "State is required" })}
              type="text"
              placeholder="e.g. Odisha"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiHome className="w-5 h-5 text-teal-600" />
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              placeholder="e.g. Cuttack"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          {/* Street */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Street
            </label>
            <input
              {...register("street", { required: "Street is required" })}
              type="text"
              placeholder="e.g. nh45"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>}
          </div>

          {/* Zipcode */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Zipcode
            </label>
            <input
              {...register("zipcode", { required: "Zipcode is required" })}
              type="text"
              placeholder="e.g. 755049"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.zipcode && <p className="mt-1 text-sm text-red-600">{errors.zipcode.message}</p>}
          </div>

          {/* Number of Rooms */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiMapPin className="w-5 h-5 text-teal-600" />
              Number of Rooms
            </label>
            <input
              {...register("numberOfRooms", {
                required: "Number of rooms is required",
                min: { value: 1, message: "Must have at least 1 room" },
              })}
              type="number"
              placeholder="e.g. 10"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.numberOfRooms && <p className="mt-1 text-sm text-red-600">{errors.numberOfRooms.message}</p>}
          </div>
        </div>

        {/* Hotel Type */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hotel Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {hotelTypes.map((type) => (
              <label key={type.value} className="relative">
                <input
                  type="radio"
                  {...register("type", { required: "Hotel type is required" })}
                  value={type.value}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-colors cursor-pointer">
                  <span className="font-medium peer-checked:text-teal-700">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Latitude
            </label>
            <input
              {...register("latitude", { required: "Latitude is required" })}
              type="text"
              placeholder="e.g. 20.4625"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Longitude
            </label>
            <input
              {...register("longitude", { required: "Longitude is required" })}
              type="text"
              placeholder="e.g. 85.8830"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>}
          </div>
        </div>

        {/* Images */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hotel Images</h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            <label htmlFor="images" className="flex flex-col items-center justify-center cursor-pointer">
              <BiMapPin className="w-12 h-12 text-teal-600 mb-2" />
              <span className="text-lg font-medium text-gray-900">Click to upload images</span>
              <span className="text-sm text-gray-500 mt-1">or drag and drop</span>
              <span className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</span>
            </label>
          </div>

          {/* Image previews */}
          {previewUrls.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group rounded-lg overflow-hidden">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page3

