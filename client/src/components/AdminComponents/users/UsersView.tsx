import { Search, Filter, ChevronDown, MoreHorizontal } from "lucide-react"
import Pagination from "../ui/Pagination"

interface User {
  id: string
  name: string
  email: string
  role: string
  joined: string
  status: "APPROVED" | "PENDING" | "REJECTED"
  avatar: string
}

export default function UsersView() {
  // Mock data for all users
  const allUsers: User[] = [
    {
      id: "USR-1001",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      role: "User",
      joined: "2023-01-15",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-1002",
      name: "Michael Smith",
      email: "michael.smith@example.com",
      role: "Host",
      joined: "2023-01-10",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-1003",
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      role: "User",
      joined: "2023-02-05",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-1004",
      name: "Daniel Wilson",
      email: "daniel.wilson@example.com",
      role: "Host",
      joined: "2023-02-20",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR-1005",
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      role: "Admin",
      joined: "2022-12-01",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all users on the platform</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
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
              {allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "Host"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </div>
  )
}

