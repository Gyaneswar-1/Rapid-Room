import { PieChart } from "lucide-react"

export default function ActivityChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">User Activity</h2>
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <PieChart className="w-24 h-24 mx-auto text-gray-300" />
          <p className="mt-4 text-sm text-gray-500">
            Chart visualization would appear here. <br />
            Showing user activity breakdown.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
            <span className="text-sm text-gray-600">Active Users</span>
          </div>
          <span className="text-sm font-medium">65%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-600">Hosts</span>
          </div>
          <span className="text-sm font-medium">25%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm text-gray-600">New Signups</span>
          </div>
          <span className="text-sm font-medium">10%</span>
        </div>
      </div>
    </div>
  )
}

