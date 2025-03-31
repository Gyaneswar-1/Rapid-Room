

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
      <div className="flex items-center justify-between">
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
        {/* <h1 className="text-xl font-semibold text-gray-800 ml-2">{getPageTitle()}</h1> */}
      </div>
    </header>
  )
}

