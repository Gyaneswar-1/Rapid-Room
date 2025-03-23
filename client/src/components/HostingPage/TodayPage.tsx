"use client"

import { useState } from "react"
import { HiOutlineExclamationCircle, HiCalendar, HiOutlineUser, HiOutlineStar } from "react-icons/hi"

// Mock data for each section
const mockData = {
  checkingOut: [
    {
      id: "1",
      guestName: "John Smith",
      propertyName: "Beachfront Villa",
      dates: "May 1 - May 8, 2023",
      guests: 2,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "2",
      guestName: "Emma Johnson",
      propertyName: "Mountain Cabin",
      dates: "May 3 - May 8, 2023",
      guests: 4,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  currentlyHosting: [
    {
      id: "3",
      guestName: "Michael Brown",
      propertyName: "Downtown Loft",
      dates: "May 5 - May 12, 2023",
      guests: 2,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  arrivingSoon: [
    {
      id: "4",
      guestName: "Sarah Wilson",
      propertyName: "Lakeside Cottage",
      dates: "May 10 - May 17, 2023",
      guests: 3,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  upcoming: [
    {
      id: "5",
      guestName: "David Lee",
      propertyName: "Beachfront Villa",
      dates: "May 20 - May 27, 2023",
      guests: 5,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: "6",
      guestName: "Jennifer Taylor",
      propertyName: "Mountain Cabin",
      dates: "June 1 - June 8, 2023",
      guests: 2,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
  pendingReview: [
    {
      id: "7",
      guestName: "Robert Martinez",
      propertyName: "Downtown Loft",
      dates: "April 25 - May 2, 2023",
      guests: 2,
      image: "/placeholder.svg?height=100&width=150",
    },
  ],
}

// For demo purposes, we'll show some data
const mockDataWithCounts = {
  "checking-out": { data: mockData.checkingOut, count: mockData.checkingOut.length },
  "currently-hosting": { data: mockData.currentlyHosting, count: mockData.currentlyHosting.length },
  "arriving-soon": { data: mockData.arrivingSoon, count: mockData.arrivingSoon.length },
  upcoming: { data: mockData.upcoming, count: mockData.upcoming.length },
  "pending-review": { data: mockData.pendingReview, count: mockData.pendingReview.length },
}

export default function TodayPage() {
  const [activeTab, setActiveTab] = useState("checking-out")

  const tabs = [
    { id: "checking-out", label: "Checking out" },
    { id: "currently-hosting", label: "Currently hosting" },
    { id: "arriving-soon", label: "Arriving soon" },
    { id: "upcoming", label: "Upcoming" },
    { id: "pending-review", label: "Pending review" },
  ]

  const currentData = mockDataWithCounts[activeTab as keyof typeof mockDataWithCounts]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Welcome back, TravelTrove</h1>
      </div>

      {/* Identity verification section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-teal-600">Verify your identity</h2>
            <p className="text-gray-600 mt-1">Required to publish</p>
            <p className="text-gray-500 text-sm mt-1">qwertyuiopkjhgfdsazxcvbnm</p>
            <button className="mt-4 px-4 py-2 border border-gray-800 rounded-lg text-gray-800 font-medium text-sm hover:bg-gray-50">
              Get started
            </button>
          </div>
          <div className="text-teal-600">
            <HiOutlineExclamationCircle className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Reservations section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your reservations</h2>
          <a href="#" className="text-gray-600 hover:underline text-sm">
            All reservations ({Object.values(mockDataWithCounts).reduce((acc, curr) => acc + curr.count, 0)})
          </a>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {tab.label} ({mockDataWithCounts[tab.id as keyof typeof mockDataWithCounts].count})
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {currentData.data.length === 0 ? (
          <div className="bg-gray-50 rounded-lg py-16 px-4 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-4 rounded-full mb-4">
              <HiCalendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">You don't have any guests</h3>
            <p className="text-gray-500">
              {activeTab === "checking-out"
                ? "checking out today or tomorrow."
                : activeTab === "currently-hosting"
                  ? "currently staying at your properties."
                  : activeTab === "arriving-soon"
                    ? "arriving soon."
                    : activeTab === "upcoming"
                      ? "with upcoming reservations."
                      : "with pending reviews."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.data.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex">
                  <div className="w-1/3 relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.propertyName}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.guestName}</h3>
                        <p className="text-gray-500 text-sm">{item.propertyName}</p>
                      </div>
                      {activeTab === "pending-review" && (
                        <div className="flex items-center text-gray-500">
                          <HiOutlineStar className="h-5 w-5 mr-1" />
                          <span className="text-sm">Review</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex items-center mb-1">
                        <HiCalendar className="h-4 w-4 mr-2" />
                        <span>{item.dates}</span>
                      </div>
                      <div className="flex items-center">
                        <HiOutlineUser className="h-4 w-4 mr-2" />
                        <span>
                          {item.guests} {item.guests === 1 ? "guest" : "guests"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md hover:bg-gray-800 transition-colors">
                        {activeTab === "pending-review" ? "Write review" : "Message"}
                      </button>
                      <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors">
                        {activeTab === "checking-out"
                          ? "Check out"
                          : activeTab === "currently-hosting"
                            ? "View details"
                            : activeTab === "arriving-soon"
                              ? "Prepare"
                              : activeTab === "upcoming"
                                ? "Modify"
                                : "Skip"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

