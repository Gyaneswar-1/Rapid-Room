import {
  HomeIcon,
  BuildingIcon,
  CalendarIcon,
  CurrencyIcon,
  GroupIcon,
  ChartBarIcon,
  MarsIcon,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface HostSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function HostSidebar({ isSidebarOpen, setIsSidebarOpen }: HostSidebarProps) {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Hotels", href: "/dashboard/hotels", icon: BuildingIcon },
    { name: "Reservations", href: "/dashboard/reservations", icon: CalendarIcon },
    { name: "Earnings", href: "/dashboard/earnings", icon: MarsIcon },
    { name: "Guests", href: "/dashboard/guests", icon: MarsIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
  ]

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Logo" />
              <span className="ml-2 text-xl font-semibold text-gray-900">HostHub</span>
            </div>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <MarsIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="/placeholder.svg?height=40&width=40" alt="User avatar" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">John Smith</p>
                <p className="text-xs text-gray-500">Host since 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HostSidebar

