"use client"

import { Menu, Search, Bell } from "lucide-react"
import { useLocation } from "react-router-dom"

interface HeaderProps {
  isMobile: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export default function Header({ isMobile, isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  const { pathname } = useLocation();

  // Get page title based on current path
  const getPageTitle = () => {
    if (pathname.startsWith("/admin")) {
      switch (pathname) {
        case "/admin/hotels":
          return "Hotel Management";
        case "/admin/hosts":
          return "Host Verification";
        case "/admin/users":
          return "User Management";
        case "/admin/settings":
          return "Settings";
        default:
          return "Admin Dashboard";
      }
    }
    return "Dashboard";
  };

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        {/* Mobile menu button */}
        {isMobile && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Page title */}
        <h1 className="text-xl font-semibold text-gray-800 ml-2">{getPageTitle()}</h1>

        {/* Search and profile */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <img src="/placeholder.svg?height=40&width=40" alt="Admin profile" className="object-cover" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

