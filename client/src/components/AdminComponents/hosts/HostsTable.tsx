"use client"

import { Eye, CheckCircle, XCircle } from "lucide-react"
import type { Host } from "../AdminDashboard"


interface HostsTableProps {
  activeSubTab: string
  openModal: (type: string, item: any) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function HostsTable({ activeSubTab, openModal, handleAction }: HostsTableProps) {


  const hostRequests: Host[] = [
    {
      id: "USR-2001",
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 123-4567",
      submitted: "2023-03-16",
      status: "PENDING",
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
      status: "PENDING",
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
      status: "APPROVED",
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
      status: "REJECTED",
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
      status: "PENDING",
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

  return (
    <div className="overflow-x-auto">
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
                    host.status === "PENDING"
                      ? "bg-amber-100 text-amber-800"
                      : host.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {host.status.charAt(0).toUpperCase() + host.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button onClick={() => openModal("host", host)} className="text-gray-600 hover:text-gray-900">
                    <Eye className="w-5 h-5" />
                  </button>
                  {host.status === "PENDING" && (
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
    </div>
  )
}

