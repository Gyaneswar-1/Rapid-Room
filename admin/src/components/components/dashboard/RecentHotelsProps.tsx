import type React from "react"

import { useState } from "react"
import { ArrowUpRight, Eye } from "lucide-react"
import FloatingCard from "../ui/FloatingCardProps"

interface RecentHotelsProps {
  openModal: (type: string, item: any) => void
  hotels?: Hotel[] // Make hotels optional prop
}

interface Hotel {
  id: string
  name: string
  location: string
  host: string
  hostId: string
  createdAt: string
  status: string
  images: string[]
}

export default function RecentHotels({ hotels = [] }: RecentHotelsProps) {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)

  // Static data removed, now accepting data through props with empty array as default

  // Handle eye button click
  const handleViewDetails = (hotel: Hotel, event: React.MouseEvent) => {
    event.stopPropagation()
    // Toggle the selected hotel
    setSelectedHotel(selectedHotel?.id === hotel.id ? null : hotel)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recently Added Hotels</h2>
        <button className="text-sm text-primary hover:text-primary font-medium flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="relative flex-shrink-0 w-10 h-10 rounded-md overflow-hidden">
                      <img src={hotel.images[0] || "/placeholder.svg"} alt={hotel.name} className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{hotel.name}</p>
                      <p className="text-xs text-gray-500">{hotel.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.location}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.host}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(hotel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      hotel.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : hotel.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={(e) => handleViewDetails(hotel, e)} className="text-primary hover:text-primary">
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Card for Hotel Details */}
      <FloatingCard isOpen={!!selectedHotel} onClose={() => setSelectedHotel(null)}>
        {selectedHotel && (
          <div className="space-y-4">
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedHotel.images?.[0] || "/placeholder.svg"}
                alt={selectedHotel.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Hotel Name</p>
                <p className="text-sm text-gray-900">{selectedHotel.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm text-gray-900">{selectedHotel.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Host</p>
                <p className="text-sm text-gray-900">{selectedHotel.host}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="text-sm text-gray-900">{new Date(selectedHotel.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedHotel.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedHotel.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedHotel.status.charAt(0).toUpperCase() + selectedHotel.status.slice(1)}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
              <p className="text-sm text-gray-900">
                This is a beautiful property located in {selectedHotel.location}. The hotel offers stunning views and
                excellent amenities for guests.
              </p>
            </div>
          </div>
        )}
      </FloatingCard>
    </div>
  )
}

