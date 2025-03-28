"use client"

import { Eye, CheckCircle, XCircle } from "lucide-react"
import type { Hotel } from "../AdminDashboard"
import { useEffect, useState } from "react"
import { getAdminHotels } from "../../../service/admin/admin_getAdminHotels.service"


interface HotelsTableProps {
  hotels: Hotel[]
  activeSubTab: string
  openModal: (type: string, item: any) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function HotelsTable({ hotels, activeSubTab, openModal, handleAction }: HotelsTableProps) {

  const [hotelsData,setHotelsData] = useState<Hotel[]>([]);

  useEffect(()=>{
    async function getHotelData() {
      const res = await getAdminHotels(1,10);
      console.log("resss",res);
      
      // setHotelsData(res);
    }
    getHotelData();
  },[])

  // Filter hotels based on active tab
  const filteredHotels = hotels.filter((hotel) => {
    if (activeSubTab === "all") return true
    return hotel.status.toLowerCase() === activeSubTab.toLowerCase()
  })

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredHotels.map((hotel) => (
            <tr key={hotel.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                    <img src={hotel.images?.[0] || "/placeholder.svg"} alt={hotel.hotelName} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{hotel.hotelName}</p>
                    <p className="text-xs text-gray-500">{hotel.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.address?.city || "N/A"}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hotel.host || hotel.perNight || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hotel.submitted ? new Date(hotel.submitted).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    hotel.status.toUpperCase() === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : hotel.status.toUpperCase() === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button onClick={() => openModal("hotel", hotel)} className="text-gray-600 hover:text-gray-900">
                    <Eye className="w-5 h-5" />
                  </button>
                  {hotel.status.toUpperCase() === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleAction("hotel", hotel.id, "approve")}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction("hotel", hotel.id, "reject")}
                        className="text-red-600 hover:text-red-900"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

