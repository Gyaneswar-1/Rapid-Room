
import { useState, useEffect } from "react"
import Slide2Buttons from "./Slide2Buttons"
import { FaWifi, FaTv, FaHome, FaDesktop, FaBuilding, FaFlask, FaTruck, FaFire, FaBolt, FaArchive, FaShieldAlt } from "react-icons/fa"

const basicAmenities = [
  { icon: FaWifi, name: "Wifi" },
  { icon: FaTv, name: "TV" },
  { icon: FaHome, name: "Kitchen" },
  { icon: FaBuilding, name: "Balcony" },
  { icon: FaDesktop, name: "WorkSpace" },
  { icon: FaArchive, name: "Washing Machine" },
  { icon: FaFlask, name: "Garden" },
  { icon: FaTruck, name: "Parking" },
]

const standOutAmenities = [
  { icon: FaArchive, name: "Pools" },
  { icon: FaFire, name: "Hot tub" },
  { icon: FaBolt, name: "Firepit" },
  { icon: FaArchive, name: "BBQ grill" },
  { icon: FaArchive, name: "Pool table" },
  { icon: FaShieldAlt, name: "Exercise equipment" },
  { icon: FaArchive, name: "Outdoor shower" },
]

const safetyItems = [
  { icon: FaShieldAlt, name: "Smoke alarm" },
  { icon: FaShieldAlt, name: "First aid Kit" },
  { icon: FaShieldAlt, name: "Fire extinguisher" },
]

const Page2 = ({ register, errors }: { register: any; errors: any }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  // Update form values when selections change
  useEffect(() => {
    register("amenities", { value: Array.from(selectedItems) })
  }, [selectedItems, register])

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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Tell guests what your place has to offer</h1>

        {/* Basic Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {basicAmenities.map((amenity, index) => (
              <Slide2Buttons
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
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Standout amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {standOutAmenities.map((amenity, index) => (
              <Slide2Buttons
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
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Safety items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {safetyItems.map((amenity, index) => (
              <Slide2Buttons
                key={index}
                icon={amenity.icon}
                text={amenity.name}
                selected={selectedItems.has(amenity.name)}
                onClick={() => handleSelection(amenity.name)}
              />
            ))}
          </div>
        </div>

        {errors.amenities && <p className="mt-1 text-sm text-red-600">{errors.amenities.message}</p>}
      </div>
    </div>
  )
}

export default Page2