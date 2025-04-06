import { useState } from "react";
import { Eye, CheckCircle, XCircle, User } from 'lucide-react';
import FloatingCard from "../ui/FloatingCardProps";
import { HotelInterface } from "./HotelsView"
import { admin_approveHotel } from "../../../../service/admin/admin_approveHotel.service";
import { admin_rejectHotel } from "../../../../service/admin/admin_rejectHotel.service";

interface HotelsTableProps {
  hotels: HotelInterface[];
  activeSubTab: string;
  openModal: (type: string, item: any) => void;
  handleAction: (updatedHotel: HotelInterface) => void;
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
  
  async function approveHotel(hotel: HotelInterface) {
    try {
      const response = await admin_approveHotel(hotel.id);
      if(response.success) {
        // Create an updated hotel object with status APPROVED
        const updatedHotel = {
          ...hotel,
          status: "APPROVED"
        };
        // Call handleAction with the updated hotel
        handleAction(updatedHotel);
      } else {
        console.error("Failed to approve hotel");
      }
    } catch (error) {
      console.error("Error approving hotel:", error);
    }
  }

  async function rejectHotel(hotel: HotelInterface) {
    try {
      const response = await admin_rejectHotel(hotel.id);
      if(response.success) {
        // Create an updated hotel object with status APPROVED
        const updatedHotel = {
          ...hotel,
          status: "REJECTED"
        };
        // Call handleAction with the updated hotel
        handleAction(updatedHotel);
      } else {
        console.error("Failed to approve hotel");
      }
    } catch (error) {
      console.error("Error approving hotel:", error);
    }
  }

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
                {hotel.createdAt
                  ? new Date(hotel.createdAt).toLocaleDateString()
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
                        onClick={() => approveHotel(hotel)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => rejectHotel(hotel)}
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
      <FloatingCard isOpen={!!selectedHotel} onClose={() => setSelectedHotel(null)}>
        {selectedHotel && (
          <div className="space-y-4">
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedHotel.images?.[0].imageUrl || "/placeholder.svg"}
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
                <p className="text-sm text-gray-900">{selectedHotel.address?.city || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Price per Night</p>
                <p className="text-sm text-gray-900">${selectedHotel.perNight}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="text-sm text-gray-900">
                  {selectedHotel.createdAt ? new Date(selectedHotel.createdAt).toLocaleDateString() : "N/A"}
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
                  {selectedHotel.status.charAt(0).toUpperCase() + selectedHotel.status.slice(1).toLowerCase()}
                </span>
              </div>
            </div>

            {/* Host Information Section */}
            {selectedHotel.id && selectedHotel.host.id && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Host Information</h3>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={selectedHotel.host.profileImage|| "/placeholder.svg"}
                      alt={selectedHotel.host.profileImage}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{selectedHotel.host.fullName}</p>
                    <p className="text-sm text-gray-600">{selectedHotel.host.email}</p>
                  </div>
                  <button
                    className="p-2 bg-white rounded-full border border-gray-200 text-gray-500 hover:text-primary hover:border-primary"
                    onClick={() => console.log(`View host profile: ${selectedHotel.host.id}`)}
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {selectedHotel.status.toUpperCase() === "PENDING" && (
  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
    <button
      onClick={() => {
        approveHotel(selectedHotel);
        setSelectedHotel(null);
      }}
      className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
    >
      Approve
    </button>
    <button
      onClick={() => {
        rejectHotel(selectedHotel);
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

