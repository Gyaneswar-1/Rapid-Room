import {
  HomeIcon,
  BuildingIcon,
  CalendarIcon,
  CircleX ,
  IndianRupee,
  TicketCheck
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
    { name: "Occupancy", href: "/dashboard/occupancy", icon: IndianRupee },
    { name: "Todays Checkins", href: "/dashboard/today-checkin", icon: TicketCheck  },
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
          <div className="h-4 flex items-center justify-between mt-5 px-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <CircleX className="h-6 w-6 text-red-950" aria-hidden="true" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || location.pathname + '/' === item.href + '/'
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-teal-600 text-white" : "text-secondary hover:bg-neutral-200 hover:text-black"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-dark" : "text-dark group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default HostSidebar

