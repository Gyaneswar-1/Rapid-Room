import { Users, Building2, Home, Bell } from "lucide-react"

export default function StatsCards() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Users",
      value: "8,249",
      change: "+12%",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Active Hosts",
      value: "1,423",
      change: "+5%",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Listed Hotels",
      value: "3,872",
      change: "+8%",
      icon: <Home className="w-6 h-6" />,
    },
    {
      title: "Pending Approvals",
      value: "42",
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div
              className={`p-3 rounded-lg ${
                stat.title === "Pending Approvals" ? "bg-amber-100 text-amber-600" : "bg-teal-100 text-teal-600"
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

