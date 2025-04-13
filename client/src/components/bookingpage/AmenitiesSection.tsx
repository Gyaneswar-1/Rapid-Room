import type React from "react"
import {
  Wifi,
  Tv,
  Home,
  Laptop,
  Flame,
  Archive,
  ShieldCheck,
  Waves,
  Droplet,
  Umbrella,
  Snowflake,
  Car,
  Utensils,
  ShipWheelIcon as Wheelchair,
  Users,
  Bath,
  Tag,
} from "lucide-react"

interface AmenitiesProps {
  hasWifi: boolean
  hasTV: boolean
  hasKitchen: boolean
  hasBalcony: boolean
  hasWorkspace: boolean
  hasWashingMachine: boolean
  hasGarden: boolean
  hasParking: boolean
  hasAirConditioning: boolean
  hasDiningArea: boolean
  hasPool: boolean
  hasHotTub: boolean
  hasFirepit: boolean
  hasBBQGrill: boolean
  hasPoolTable: boolean
  hasExerciseEquipment: boolean
  hasOutdoorShower: boolean
  hasSmokeAlarm: boolean
  hasFirstAidKit: boolean
  hasFireExtinguisher: boolean
  hasAccessibility: boolean
}

const AmenitiesSection: React.FC<AmenitiesProps> = (props) => {
  // Create an array of amenities with their icons and labels
  const amenities = [
    { available: props.hasWifi, icon: <Wifi className="h-5 w-5" />, label: "WiFi" },
    { available: props.hasTV, icon: <Tv className="h-5 w-5" />, label: "TV" },
    { available: props.hasKitchen, icon: <Utensils className="h-5 w-5" />, label: "Kitchen" },
    { available: props.hasBalcony, icon: <Home className="h-5 w-5" />, label: "Balcony" },
    { available: props.hasWorkspace, icon: <Laptop className="h-5 w-5" />, label: "Workspace" },
    { available: props.hasWashingMachine, icon: <Archive className="h-5 w-5" />, label: "Washing Machine" },
    { available: props.hasGarden, icon: <Umbrella className="h-5 w-5" />, label: "Garden" },
    { available: props.hasParking, icon: <Car className="h-5 w-5" />, label: "Parking" },
    { available: props.hasAirConditioning, icon: <Snowflake className="h-5 w-5" />, label: "Air Conditioning" },
    { available: props.hasDiningArea, icon: <Utensils className="h-5 w-5" />, label: "Dining Area" },
    { available: props.hasPool, icon: <Waves className="h-5 w-5" />, label: "Pool" },
    { available: props.hasHotTub, icon: <Droplet className="h-5 w-5" />, label: "Hot Tub" },
    { available: props.hasFirepit, icon: <Flame className="h-5 w-5" />, label: "Firepit" },
    { available: props.hasBBQGrill, icon: <Flame className="h-5 w-5" />, label: "BBQ Grill" },
    { available: props.hasPoolTable, icon: <Tag className="h-5 w-5" />, label: "Pool Table" },
    { available: props.hasExerciseEquipment, icon: <Users className="h-5 w-5" />, label: "Exercise Equipment" },
    { available: props.hasOutdoorShower, icon: <Bath className="h-5 w-5" />, label: "Outdoor Shower" },
    { available: props.hasSmokeAlarm, icon: <ShieldCheck className="h-5 w-5" />, label: "Smoke Alarm" },
    { available: props.hasFirstAidKit, icon: <ShieldCheck className="h-5 w-5" />, label: "First Aid Kit" },
    { available: props.hasFireExtinguisher, icon: <Flame className="h-5 w-5" />, label: "Fire Extinguisher" },
    { available: props.hasAccessibility, icon: <Wheelchair className="h-5 w-5" />, label: "Accessibility" },
  ]

  // Filter only available amenities
  const availableAmenities = amenities.filter((amenity) => amenity.available)

  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-6">What this place offers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-6">
        {availableAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">{amenity.icon}</div>
            <span className="text-sm font-medium">{amenity.label}</span>
          </div>
        ))}
      </div>

      {availableAmenities.length === 0 && (
        <p className="text-gray-500 italic">No amenities listed for this property.</p>
      )}
    </div>
  )
}

export default AmenitiesSection
