"use client"
import { Edit, Star, Trash } from "lucide-react"
import { Link } from "react-router-dom"

export function HostedHotels() {
  const hotels = [
    {
      id: 1,
      name: "Seaside Resort",
      location: "Miami, FL",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.8,
      reviews: 124,
      status: "active",
      occupancyRate: "85%",
    },
    {
      id: 2,
      name: "Mountain Lodge",
      location: "Aspen, CO",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.6,
      reviews: 98,
      status: "active",
      occupancyRate: "72%",
    },
    {
      id: 3,
      name: "City Suites",
      location: "New York, NY",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.5,
      reviews: 156,
      status: "maintenance",
      occupancyRate: "0%",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Your Hotels</h3>
          <p className="text-sm text-gray-500">Manage your listed properties</p>
        </div>
        <Link to={"/add-hotel"} className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
          Add New Hotel
        </Link >
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative h-[150px] w-full">
                <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="h-full w-full object-cover" />
                <span
                  className={`absolute right-2 top-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    hotel.status === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {hotel.status === "active" ? "Active" : "Maintenance"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Occupancy:</span> {hotel.occupancyRate}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    <Trash className="mr-1 h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

