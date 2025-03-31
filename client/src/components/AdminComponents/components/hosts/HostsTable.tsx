import type React from "react";

import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import FloatingCard from "../ui/FloatingCardProps";
import { HostInterface } from "./HostsView";
import { admin_approveHost } from "../../../../service/admin/admin_approveHosts.service";
import { admin_rejectHost } from "../../../../service/admin/admin_rejectHosts.service";

interface HostsTableProps {
  data: HostInterface[];
  activeSubTab: string;
  handleAction: (hosts: HostInterface[]) => void;
}

export default function HostsTable({
  data,
  activeSubTab,
  handleAction,
}: HostsTableProps) {
  // Add missing selectedHost state
  const [selectedHost, setSelectedHost] = useState<HostInterface | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  async function approveHost(id: string | number) {
    try {
      setLoading({ ...loading, [id]: true });
      const response = await admin_approveHost(id);

      if (response.success) {
        // Update hosts data after successful approval
        const updatedHosts = data.map((host) =>
          host.id === id
            ? {
                ...host,
                status: "APPROVED" as "PENDING" | "APPROVED" | "REJECTED",
              }
            : host
        );
        handleAction(updatedHosts);
      }
    } catch (error) {
      console.error("Error approving host:", error);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  }

  async function rejectHost(id: string | number) {
    try {
      setLoading({ ...loading, [id]: true });
      const response = await admin_rejectHost(id);

      if (response.success) {
        // Update hosts data after successful rejection
        const updatedHosts = data.map((host) =>
          host.id === id
            ? {
                ...host,
                status: "REJECTED" as "PENDING" | "APPROVED" | "REJECTED",
              }
            : host
        );
        handleAction(updatedHosts);
      }
    } catch (error) {
      console.error("Error rejecting host:", error);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  }

  // Filter hosts based on active tab
  const filteredHosts = data.filter((host) => {
    if (activeSubTab === "ALL") return true;
    return host.status === activeSubTab;
  });

  // Handle eye button click
  const handleViewDetails = (host: HostInterface, event: React.MouseEvent) => {
    event.stopPropagation();
    // Toggle the selected host
    setSelectedHost(selectedHost?.id === host.id ? null : host);
  };

  

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID Type
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
          {filteredHosts.map((host) => (
            <tr key={host.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={host.profileImage || "/placeholder.svg"}
                      alt={host.fullName}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {host.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{host.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-500">{host.email}</p>
                <p className="text-sm text-gray-500">{host.phoneNumber}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {host.GovID}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(host.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    host.status === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : host.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {host.status.charAt(0).toUpperCase() +
                    host.status.slice(1).toLowerCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleViewDetails(host, e)}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    disabled={loading[host.id]}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {host.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => approveHost(host.id)}
                        className="text-green-600 hover:text-green-900 cursor-pointer disabled:opacity-50"
                        disabled={loading[host.id]}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => rejectHost(host.id)}
                        className="text-red-600 hover:text-red-900  disabled:opacity-50 cursor-pointer"
                        disabled={loading[host.id]}
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

      {/* Floating Card for Host Details */}

      <FloatingCard
        isOpen={!!selectedHost}
        onClose={() => setSelectedHost(null)}
      >
        {selectedHost && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={selectedHost.profileImage || "/placeholder.svg"}
                  alt={selectedHost.fullName}
                  className="object-cover h-full w-full"
                />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {selectedHost.fullName}
                </p>
                <p className="text-sm text-gray-500">{selectedHost.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{selectedHost.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-sm text-gray-900">
                  {selectedHost.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Type</p>
                <p className="text-sm text-gray-900">Adhar card</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Number</p>
                <p className="text-sm text-gray-900">{selectedHost.GovID}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Submission Date
                </p>
                <p className="text-sm text-gray-900">
                  {new Date(selectedHost.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedHost.status === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : selectedHost.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedHost.status.charAt(0).toUpperCase() +
                    selectedHost.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Government ID
              </p>
              <div className="text-center py-2">
                <p className="text-sm text-gray-500">ID Document: adhar Card</p>
                <p className="text-xs text-gray-400 mt-1">
                  ID Number: {selectedHost.GovID}
                </p>
              </div>
            </div>

            {/* Hosted Hotels Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Hosted Hotels
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedHost.listedHotels?.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => console.log(`Navigate to hotel ${hotel.id}`)}
                  >
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={hotel.images ? hotel.images[0].imageUrl : "/placeholder.svg"}
                        alt={hotel.hotelName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {hotel.hotelName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {hotel.id}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedHost.status === "PENDING" && (
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    approveHost(selectedHost.id);
                    setSelectedHost(null);
                  }}
                  className="px-3 py-1.5 bg-green-600 cursor-pointer text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={loading[selectedHost.id]}
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    rejectHost(selectedHost.id);
                    setSelectedHost(null);
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50"
                  disabled={loading[selectedHost.id]}
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
