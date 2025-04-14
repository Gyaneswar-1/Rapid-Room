import {
  Search,
  MoreHorizontal,
  Loader,
} from "lucide-react";
import Pagination from "../ui/Pagination";
import { useEffect, useState } from "react";
import { admin_getAllUsers } from "../../../../service/admin/admin_getAllUsers.service";

interface UserInterface {
  id: number;
  fullName: string;
  email: string;
  isHost: boolean;
  profileImage: string | null;
  createdAt: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  phoneNumber: string | null;
  address: {
    city: string | null;
    country: string | null;
    state: string | null;
  } | null;
}

export default function UsersView() {
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function getUserDatas() {
    try {
      setLoading(true);
      setError(false); // Reset error state on new request
      const response = await admin_getAllUsers(1, 10000);
  
      if (response && response.success) {
        setUserData(response.data.users);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(true); // Set error state on any exception
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDatas();
  }, []);

  if (loading === true) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error === true) {
    return (
      <div className="flex w-full h-full flex-col items-center justify-center gap-4 text-center p-8">
        <div className="rounded-full bg-red-100 p-4 text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M12 8v4m0 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"></path>
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            Error Loading Users
          </h3>
          <p className="text-gray-600 max-w-md">
            We encountered a problem while fetching user data. This could be due
            to a network issue or server problem.
          </p>
        </div>
        <button
          onClick={() => {
            setError(false);
            getUserDatas();
          }}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        
        <div>
          <h1 className="text-xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all users on the platform
          </p>
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
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.fullName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </p>
                        <p className="text-xs text-gray-500">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isHost === true
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.isHost ? "Host" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
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
  );
}
