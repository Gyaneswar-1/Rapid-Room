"use client"
import { BarChart3, Calendar, CreditCard, Home, Hotel, Settings, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/host/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Hotels",
    href: "/host/hotels",
    icon: <Hotel className="h-5 w-5" />,
  },
  {
    title: "Reservations",
    href: "/host/reservations",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Earnings",
    href: "/host/earnings",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Guests",
    href: "/host/guests",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/host/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/host/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function HostSidebar() {
  const location = useLocation()

  return (
    <aside className="w-64 flex-col border-r bg-white h-full">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/host/dashboard" className="flex items-center gap-2">
          <Hotel className="h-6 w-6 text-rose-500" />
          <span className="text-lg font-bold">StayHub Host</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === item.href
                  ? "bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t p-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 text-sm font-medium">Host Level: Gold</div>
          <div className="mb-3 text-xs text-gray-500">5 more bookings to reach Platinum</div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-4/5 bg-rose-500" />
          </div>
        </div>
      </div>
    </aside>
  )
}

