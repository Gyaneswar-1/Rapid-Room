"use client"


import EarningsOverview from "../components/analytics/EarningsOverview"



export default function HostDashboard() {


  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    totalEarnings: 12450.75,
    pendingPayouts: 1250.5,
    totalReservations: 48,
    activeListings: 5,
  }

  // Function to get room occupancy data
  const getRoomOccupancyData = () => {
    return [
      { type: "Single Rooms", total: 15, occupied: 8, available: 7 },
      { type: "Double Rooms", total: 25, occupied: 18, available: 7 },
      { type: "Suites", total: 12, occupied: 10, available: 2 },
      { type: "Family Rooms", total: 8, occupied: 5, available: 3 },
    ]
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {hostData.name}. Here's an overview of your hosting activity.
              </p>
            </div>

            {/* Earnings Overview */}
            <EarningsOverview
              totalEarnings={hostData.totalEarnings}
              pendingPayouts={hostData.pendingPayouts}
              totalReservations={hostData.totalReservations}
              activeListings={hostData.activeListings}
            />

            {/* Room Occupancy Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Room Occupancy Overview</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-md bg-primary text-teal-700">All Properties</button>
                  <button className="px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-100">By Hotel</button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row items-center justify-center">
                    <div className="relative w-48 h-48 mb-4 md:mb-0">
                      {/* Create pie chart for room types */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gray-200"></div>

                        {/* Pie segments for room types */}
                        <div
                          className="absolute inset-0 bg-primary"
                          style={{
                            clipPath: `polygon(50% 50%, 50% 0, 100% 0, 100% 50%)`,
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-teal-500"
                          style={{
                            clipPath: `polygon(50% 50%, 100% 0, 100% 100%, 75% 100%)`,
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-green-500"
                          style={{
                            clipPath: `polygon(50% 50%, 100% 100%, 0 100%, 0 75%)`,
                          }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-amber-500"
                          style={{
                            clipPath: `polygon(50% 50%, 0 100%, 0 0, 25% 0)`,
                          }}
                        ></div>
                      </div>

                      {/* Center circle */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center shadow-sm">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">60</div>
                            <div className="text-xs text-gray-500">Total Rooms</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:ml-4">
                      <div className="space-y-3">
                        {getRoomOccupancyData().map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                index === 0
                                  ? "bg-primary"
                                  : index === 1
                                    ? "bg-teal-500"
                                    : index === 2
                                      ? "bg-green-500"
                                      : "bg-amber-500"
                              } mr-2`}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">{item.type}</span>
                                <span className="text-sm font-medium">{item.total}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Occupancy Stats */}
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Rooms</div>
                        <div className="text-2xl font-bold text-gray-900">60</div>
                        <div className="mt-2 text-xs text-gray-500">Across all properties</div>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Occupied</div>
                        <div className="text-2xl font-bold text-teal-600">41</div>
                        <div className="mt-2 text-xs text-green-600">68% occupancy rate</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium text-gray-900">Occupancy by Room Type</div>
                        <div className="text-xs text-gray-500">Last 30 days</div>
                      </div>

                      {getRoomOccupancyData().map((item, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm text-gray-600">{item.type}</div>
                            <div className="text-sm font-medium text-gray-900">
                              {Math.round((item.occupied / item.total) * 100)}%
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                index === 0
                                  ? "bg-primary"
                                  : index === 1
                                    ? "bg-teal-500"
                                    : index === 2
                                      ? "bg-green-500"
                                      : "bg-amber-500"
                              }`}
                              style={{ width: `${(item.occupied / item.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
    </div>
  )
}

