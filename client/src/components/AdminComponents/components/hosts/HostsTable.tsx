"use client"

import type React from "react"

import { useState } from "react"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import FloatingCard from "../ui/FloatingCardProps"

export interface Host {
  id: string
  name: string
  email: string
  phone: string
  submitted: string
  status: string
  govId: string
  govIdType: string
  avatar: string
}

interface HostsTableProps {
  activeSubTab: string
  openModal: (type: string, item: any) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function HostsTable({ activeSubTab, openModal, handleAction }: HostsTableProps) {
  // State for floating card
  const [selectedHost, setSelectedHost] = useState<Host | null>(null)

  // Mock data for host verification requests
  const hostRequests: Host[] = [
    {
      id: "USR-2001",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 123-4567",
      submitted: "2023-03-16",
      status: "pending",
      govId: "ID-12345678",
      govIdType: "Passport",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-2002",
      name: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      phone: "+1 (555) 987-6543",
      submitted: "2023-03-15",
      status: "pending",
      govId: "ID-87654321",
      govIdType: "Driver's License",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-2003",
      name: "James Taylor",
      email: "james.taylor@example.com",
      phone: "+1 (555) 456-7890",
      submitted: "2023-03-14",
      status: "approved",
      govId: "ID-23456789",
      govIdType: "National ID",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-2004",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      phone: "+1 (555) 789-0123",
      submitted: "2023-03-12",
      status: "rejected",
      govId: "ID-34567890",
      govIdType: "Passport",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-2005",
      name: "Thomas Lee",
      email: "thomas.lee@example.com",
      phone: "+1 (555) 234-5678",
      submitted: "2023-03-10",
      status: "pending",
      govId: "ID-45678901",
      govIdType: "Driver's License",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filter hosts based on active tab
  const filteredHosts = hostRequests.filter((host) => {
    if (activeSubTab === "all") return true
    return host.status === activeSubTab
  })

  // Handle eye button click
  const handleViewDetails = (host: Host, event: React.MouseEvent) => {
    event.stopPropagation()
    // Toggle the selected host
    setSelectedHost(selectedHost?.id === host.id ? null : host)
  }

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Submitted
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredHosts.map((host) => (
            <tr key={host.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                    <img src={host.avatar || "/placeholder.svg"} alt={host.name} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{host.name}</p>
                    <p className="text-xs text-gray-500">{host.id}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-gray-500">{host.email}</p>
                <p className="text-sm text-gray-500">{host.phone}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.govIdType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(host.submitted).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    host.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : host.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {host.status.charAt(0).toUpperCase() + host.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button onClick={(e) => handleViewDetails(host, e)} className="text-gray-600 hover:text-gray-900">
                    <Eye className="w-5 h-5" />
                  </button>
                  {host.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction("host", host.id, "approve")}
                        className="text-green-600 hover:text-green-900"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleAction("host", host.id, "reject")}
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

      {/* Floating Card for Host Details */}
      <FloatingCard isOpen={!!selectedHost} onClose={() => setSelectedHost(null)}>
        {selectedHost && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <img src={selectedHost.avatar || "/placeholder.svg"} alt={selectedHost.name} className="object-cover" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{selectedHost.name}</p>
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
                <p className="text-sm text-gray-900">{selectedHost.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Type</p>
                <p className="text-sm text-gray-900">{selectedHost.govIdType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Number</p>
                <p className="text-sm text-gray-900">{selectedHost.govId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submission Date</p>
                <p className="text-sm text-gray-900">{new Date(selectedHost.submitted).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedHost.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedHost.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedHost.status.charAt(0).toUpperCase() + selectedHost.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-500 mb-2">Government ID</p>
              <div className="text-center py-2">
                <p className="text-sm text-gray-500">ID Document: {selectedHost.govIdType}</p>
                <p className="text-xs text-gray-400 mt-1">ID Number: {selectedHost.govId}</p>
              </div>
            </div>

            {selectedHost.status === "pending" && (
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleAction("host", selectedHost.id, "approve")
                    setSelectedHost(null)
                  }}
                  className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleAction("host", selectedHost.id, "reject")
                    setSelectedHost(null)
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
  )
}

