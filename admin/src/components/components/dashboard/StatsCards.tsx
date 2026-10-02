import { Users, Building2, Home, Bell } from "lucide-react"

interface StatsCardsProps {
  totalUsers?: number;
  activeHosts?: number;
  listedHotels?: number;
  pendingApprovals?: number;
  loading?: boolean;
}

export default function StatsCards({
  totalUsers = 0,
  activeHosts = 0,
  listedHotels = 0,
  pendingApprovals = 0,
  loading = false
}: StatsCardsProps) {

  const stats = [ 
    {
      title: "Total Users",
      value: loading ? "Loading..." : totalUsers.toLocaleString(),
      change: "+12%", // Note: These could be calculated if we had historical data
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Active Hosts",
      value: loading ? "Loading..." : activeHosts.toLocaleString(),
      change: "+5%",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Listed Hotels",
      value: loading ? "Loading..." : listedHotels.toLocaleString(),
      change: "+8%",
      icon: <Home className="w-6 h-6" />,
    },
    {
      title: "Pending Approvals",
      value: loading ? "Loading..." : pendingApprovals.toLocaleString(),
      change: "-3%",
      icon: <Bell className="w-6 h-6" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? (
                  <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  stat.value
                )}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                stat.title === "Pending Approvals" ? "bg-amber-100 text-amber-600" : "bg-teal-100 text-primary"
              }`}
            >
              {stat.icon}
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-xs font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}

