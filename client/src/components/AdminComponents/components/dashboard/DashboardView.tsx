"use client"

import { useState } from "react"
import StatsCards from "./StatsCards"
import PendingApprovals from "./PendingApprovalsProps"
import ActivityChart from "./ActivityChart"
import RecentHotels from "./RecentHotelsProps"

export default function DashboardView() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item })
    setShowModal(true)
  }

  // Function to handle approval/rejection
  const handleAction = (type: string, id: string, action: "approve" | "reject") => {
    console.log(`${action} ${type} with ID: ${id}`)
    // Here you would make an API call to update the status
    setShowModal(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome to your admin dashboard</p>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityChart />
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">New hotel listing submitted</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Hotels */}
      <RecentHotels openModal={openModal} />
    </div>
  )
}

