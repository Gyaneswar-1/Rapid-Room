"use client"

import { useState } from "react"
import { Calendar, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
      

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-gray-500">Track your hosting performance and insights</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 h-8 gap-1">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>Last 30 Days</span>
                </button>
                <button className="inline-flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 h-8 gap-1">
                  <Filter className="h-3.5 w-3.5 mr-1" />
                  <span>Filter</span>
                </button>
                <button className="inline-flex items-center px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 h-8 gap-1">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <div className="grid grid-cols-4 w-full">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-3 text-sm font-medium ${
                      activeTab === "overview"
                        ? "border-b-2 border-teal-500 text-teal-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`py-3 text-sm font-medium ${
                      activeTab === "bookings"
                        ? "border-b-2 border-teal-500 text-teal-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab("revenue")}
                    className={`py-3 text-sm font-medium ${
                      activeTab === "revenue"
                        ? "border-b-2 border-teal-500 text-teal-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setActiveTab("guests")}
                    className={`py-3 text-sm font-medium ${
                      activeTab === "guests"
                        ? "border-b-2 border-teal-500 text-teal-600"
                        : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Guests
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4">
                {activeTab === "overview" && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                      </div>
                      <div className="text-2xl font-bold">$12,450.75</div>
                      <p className="text-xs text-gray-500">+15% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Bookings</h3>
                      </div>
                      <div className="text-2xl font-bold">48</div>
                      <p className="text-xs text-gray-500">+8% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Occupancy Rate</h3>
                      </div>
                      <div className="text-2xl font-bold">68%</div>
                      <p className="text-xs text-gray-500">+5% from last month</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      <div className="flex flex-row items-center justify-between pb-2">
                        <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
                      </div>
                      <div className="text-2xl font-bold">4.8</div>
                      <p className="text-xs text-gray-500">+0.2 from last month</p>
                    </div>
                  </div>
                )}

                {activeTab === "bookings" && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Booking Analytics</h3>
                      <p className="text-sm text-gray-500">View your booking trends and patterns</p>
                    </div>
                    <div className="h-[300px] flex items-center justify-center p-4">
                      <p className="text-gray-500">Booking analytics chart will appear here</p>
                    </div>
                  </div>
                )}

                {activeTab === "revenue" && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                      <p className="text-sm text-gray-500">Track your earnings and financial performance</p>
                    </div>
                    <div className="h-[300px] flex items-center justify-center p-4">
                      <p className="text-gray-500">Revenue analytics chart will appear here</p>
                    </div>
                  </div>
                )}

                {activeTab === "guests" && (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Guest Analytics</h3>
                      <p className="text-sm text-gray-500">Understand your guest demographics and behavior</p>
                    </div>
                    <div className="h-[300px] flex items-center justify-center p-4">
                      <p className="text-gray-500">Guest analytics chart will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

