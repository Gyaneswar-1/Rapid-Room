"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  FaWifi,
  FaTv,
  FaHome,
  FaDesktop,
  FaBuilding,
  FaFlask,
  FaFire,
  FaArchive,
  FaShieldAlt,
  FaSwimmingPool,
  FaHotTub,
  FaUmbrellaBeach,
  FaSnowflake,
  FaParking,
  FaUtensils,
  FaWheelchair,
} from "react-icons/fa"

interface AmenityItem {
  icon: React.ComponentType
  name: string
  category: string
}

const allAmenities: AmenityItem[] = [
  { icon: FaWifi, name: "Wifi", category: "basic" },
  { icon: FaTv, name: "TV", category: "basic" },
  { icon: FaHome, name: "Kitchen", category: "basic" },
  { icon: FaBuilding, name: "Balcony", category: "basic" },
  { icon: FaDesktop, name: "WorkSpace", category: "basic" },
  { icon: FaArchive, name: "Washing Machine", category: "basic" },
  { icon: FaFlask, name: "Garden", category: "basic" },
  { icon: FaParking, name: "Parking", category: "basic" },
  { icon: FaSnowflake, name: "Air Conditioning", category: "basic" },
  { icon: FaUtensils, name: "Dining Area", category: "basic" },

  { icon: FaSwimmingPool, name: "Pool", category: "standout" },
  { icon: FaHotTub, name: "Hot tub", category: "standout" },
  { icon: FaFire, name: "Firepit", category: "standout" },
  { icon: FaArchive, name: "BBQ grill", category: "standout" },
  { icon: FaArchive, name: "Pool table", category: "standout" },
  { icon: FaArchive, name: "Exercise equipment", category: "standout" },
  { icon: FaUmbrellaBeach, name: "Outdoor shower", category: "standout" },

  { icon: FaShieldAlt, name: "Smoke alarm", category: "safety" },
  { icon: FaShieldAlt, name: "First aid Kit", category: "safety" },
  { icon: FaShieldAlt, name: "Fire extinguisher", category: "safety" },
  { icon: FaWheelchair, name: "Accessibility features", category: "safety" },
]

interface AmenityButtonProps {
  icon: React.ComponentType
  text: string
  selected: boolean
  onClick: () => void
}

function AmenityButton({ icon: Icon, text, selected, onClick }: AmenityButtonProps) {
  return (
    <div
      className={`relative flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
        selected
          ? "border-teal-600 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-teal-600 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <Icon className={`w-8 h-8 mb-2 ${selected ? "text-teal-600" : "text-gray-600"}`} />
      <p className={`text-sm text-center ${selected ? "font-medium text-teal-700" : "text-gray-700"}`}>{text}</p>
    </div>
  )
}

const Page2 = ({ register, errors, setValue }: { register: any; errors: any; setValue: any }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  // Update form values when selections change
  useEffect(() => {
    const amenitiesArray = Array.from(selectedItems)
    setValue("amenities", amenitiesArray)
  }, [selectedItems, setValue])

  const handleSelection = (name: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }
      return newSet
    })
  }

  const basicAmenities = allAmenities.filter((item) => item.category === "basic")
  const standoutAmenities = allAmenities.filter((item) => item.category === "standout")
  const safetyItems = allAmenities.filter((item) => item.category === "safety")

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Tell guests what your place has to offer</h1>
        <p className="text-gray-600 mb-8">
          Select all the amenities that your hotel provides. The more amenities you offer, the more attractive your
          listing will be.
        </p>

        {/* Basic Amenities */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
              <FaHome className="w-4 h-4 text-teal-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Basic amenities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {basicAmenities.map((amenity, index) => (
              <AmenityButton
                key={index}
                icon={amenity.icon}
                text={amenity.name}
                selected={selectedItems.has(amenity.name)}
                onClick={() => handleSelection(amenity.name)}
              />
            ))}
          </div>
        </div>

        {/* Standout Amenities */}
        <div className="mb-10">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaSwimmingPool className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Standout amenities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {standoutAmenities.map((amenity, index) => (
              <AmenityButton
                key={index}
                icon={amenity.icon}
                text={amenity.name}
                selected={selectedItems.has(amenity.name)}
                onClick={() => handleSelection(amenity.name)}
              />
            ))}
          </div>
        </div>

        {/* Safety Items */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <FaShieldAlt className="w-4 h-4 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Safety items</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {safetyItems.map((amenity, index) => (
              <AmenityButton
                key={index}
                icon={amenity.icon}
                text={amenity.name}
                selected={selectedItems.has(amenity.name)}
                onClick={() => handleSelection(amenity.name)}
              />
            ))}
          </div>
        </div>

        {/* Selected amenities summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-2">Selected Amenities ({selectedItems.size})</h3>
          {selectedItems.size > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedItems).map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-1.5 text-teal-600 hover:text-teal-800"
                    onClick={() => handleSelection(item)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No amenities selected yet. Select at least one amenity.</p>
          )}
        </div>

        {errors.amenities && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
            {errors.amenities.message || "Please select at least one amenity"}
          </p>
        )}
      </div>
    </div>
  )
}

export default Page2

