

import { useState } from "react";
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import FloatingCard from "../ui/FloatingCardProps";
import { HotelInterface } from "./HotelsView"

interface HotelsTableProps {
  hotels: HotelInterface[];
  activeSubTab: string;
  openModal: (type: string, item: any) => void;
  handleAction: (type: string, id: string, action: "APPROVE" | "REJECT") => void;
}

export default function HotelsTable({
  hotels,
  activeSubTab,
  handleAction,
}: HotelsTableProps) {
  // State for floating card
  const [selectedHotel, setSelectedHotel] = useState<HotelInterface | null>(null);

  // Filter hotels based on active tab
  const filteredHotels = hotels.filter((hotel) => {
    if (activeSubTab === "all") return true;
    return hotel.status.toLowerCase() === activeSubTab.toLowerCase();
  });

  // Handle eye button click
  const handleViewDetails = (hotel: HotelInterface, event: React.MouseEvent) => {
    event.stopPropagation();
    // Toggle the selected hotel
    setSelectedHotel(selectedHotel?.id === hotel.id ? null : hotel);
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hotel
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price/Night
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredHotels.map((hotel) => (
            <tr key={hotel.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                    <img
                      src={hotel.images?.[0]?.imageUrl || "/placeholder.svg"}
                      alt={hotel.hotelName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {hotel.hotelName}
                    </p>
                    <p className="text-xs text-gray-500">{hotel.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hotel.address?.city || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${hotel.perNight || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hotel.submitted
                  ? new Date(hotel.submitted).toLocaleDateString()
                  : "N/A"}
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
                  {hotel.status.charAt(0).toUpperCase() +
                    hotel.status.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleViewDetails(hotel, e)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {hotel.status.toUpperCase() === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleAction("hotel", hotel.id.toString(), "APPROVE")}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction("hotel", hotel.id.toString(), "REJECT")}
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

      {/* Floating Card for Hotel Details */}
      <FloatingCard
        isOpen={!!selectedHotel}
        onClose={() => setSelectedHotel(null)}
      >
        {selectedHotel && (
          <div className="space-y-4">
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedHotel.images?.[0]?.imageUrl || "/placeholder.svg"}
                alt={selectedHotel.hotelName}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Hotel Name</p>
                <p className="text-sm text-gray-900">{selectedHotel.hotelName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-sm text-gray-900">
                  {selectedHotel.address?.city || "N/A"}, {selectedHotel.address?.country || ""}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Type</p>
                <p className="text-sm text-gray-900">{selectedHotel.type || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Price per Night</p>
                <p className="text-sm text-gray-900">${selectedHotel.perNight}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="text-sm text-gray-900">
                  {selectedHotel.submitted
                    ? new Date(selectedHotel.submitted).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedHotel.status.toUpperCase() === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : selectedHotel.status.toUpperCase() === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedHotel.status.charAt(0).toUpperCase() +
                    selectedHotel.status.slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            {selectedHotel.status.toUpperCase() === "PENDING" && (
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleAction("hotel", selectedHotel.id.toString(), "APPROVE");
                    setSelectedHotel(null);
                  }}
                  className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleAction("hotel", selectedHotel.id.toString(), "REJECT");
                    setSelectedHotel(null);
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </FloatingCard>
    </div>
  );
}
