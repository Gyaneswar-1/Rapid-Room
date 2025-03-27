"use client"

import { ArrowUpRight } from "lucide-react"

interface RecentHotelsProps {
  openModal: (type: string, item: any) => void
}

export default function RecentHotels({ openModal }: RecentHotelsProps) {
  // Mock data for hotel approval requests
  const hotelRequests = [
    {
      id: "HTL-1001",
      name: "Sunset Beach Resort",
      location: "Bali, Indonesia",
      host: "John Smith",
      hostId: "HOST-501",
      submitted: "2023-03-15",
      status: "pending",
      images: ["/placeholder.svg?height=80&width=120"],
    },
    {
      id: "HTL-1002",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      host: "Emma Johnson",
      hostId: "HOST-502",
      submitted: "2023-03-14",
      status: "pending",
      images: ["/placeholder.svg?height=80&width=120"],
    },
    {
      id: "HTL-1003",
      name: "City Center Suites",
      location: "Paris, France",
      host: "Robert Chen",
      hostId: "HOST-503",
      submitted: "2023-03-12",
      status: "approved",
      images: ["/placeholder.svg?height=80&width=120"],
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Recently Added Hotels</h2>
        <button className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center">
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
            {hotelRequests.map((hotel) => (
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
                  {new Date(hotel.submitted).toLocaleDateString()}
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
                  <button onClick={() => openModal("hotel", hotel)} className="text-teal-600 hover:text-teal-900">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

