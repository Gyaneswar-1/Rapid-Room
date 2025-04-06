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

          </div>
        </main>
    </div>
  )
}

