;

import { useState } from "react";

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("all");


  const reservations = [
    {
      id: "RES-1234",
      guest: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      hotel: "Seaside Resort",
      room: "Deluxe Ocean View",
      checkIn: "Apr 15, 2023",
      checkOut: "Apr 20, 2023",
      status: "confirmed",
      amount: "$1,250.00",
      guests: 2,
    },
    {
      id: "RES-1235",
      guest: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MB",
      },
      hotel: "Mountain Lodge",
      room: "Suite with Fireplace",
      checkIn: "Apr 18, 2023",
      checkOut: "Apr 22, 2023",
      status: "pending",
      amount: "$980.00",
      guests: 3,
    },
    {
      id: "RES-1236",
      guest: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      hotel: "City Suites",
      room: "Executive Suite",
      checkIn: "Apr 20, 2023",
      checkOut: "Apr 25, 2023",
      status: "confirmed",
      amount: "$1,450.00",
      guests: 1,
    },
    {
      id: "RES-1237",
      guest: {
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JR",
      },
      hotel: "Seaside Resort",
      room: "Family Suite",
      checkIn: "Apr 22, 2023",
      checkOut: "Apr 29, 2023",
      status: "confirmed",
      amount: "$2,100.00",
      guests: 4,
    },
    {
      id: "RES-1238",
      guest: {
        name: "Olivia Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "OT",
      },
      hotel: "Mountain Lodge",
      room: "Deluxe King Room",
      checkIn: "Apr 25, 2023",
      checkOut: "Apr 28, 2023",
      status: "pending",
      amount: "$750.00",
      guests: 2,
    },
  ];

  const filteredReservations =
    activeTab === "all"
      ? reservations
      : reservations.filter((r) => r.status === activeTab);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Export
              </button>
              <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                Add Reservation
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <div className="grid grid-cols-4 w-full">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "all"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab("confirmed")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "confirmed"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "pending"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("cancelled")}
                  className={`py-3 text-sm font-medium ${
                    activeTab === "cancelled"
                      ? "border-b-2 border-teal-500 text-teal-600"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeTab === "all"
                    ? "All Reservations"
                    : activeTab === "confirmed"
                    ? "Confirmed Reservations"
                    : activeTab === "pending"
                    ? "Pending Reservations"
                    : "Cancelled Reservations"}
                </h3>
              </div>

              {filteredReservations.length > 0 ? (
                <div className="space-y-4 mt-4">
                  {filteredReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                          {reservation.guest.avatar ? (
                            <img
                              src={
                                reservation.guest.avatar || "/placeholder.svg"
                              }
                              alt={reservation.guest.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary text-teal-600">
                              {reservation.guest.initials}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {reservation.guest.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {reservation.hotel} - {reservation.room}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <div className="text-sm font-medium">Check-in</div>
                          <div className="text-sm text-gray-500">
                            {reservation.checkIn}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Check-out</div>
                          <div className="text-sm text-gray-500">
                            {reservation.checkOut}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Guests</div>
                          <div className="text-sm text-gray-500">
                            {reservation.guests}
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            reservation.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                        >
                          {reservation.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                        <div className="font-medium">{reservation.amount}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                          View
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No {activeTab} reservations found.
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-teal-500 bg-primary text-sm font-medium text-teal-600 hover:bg-primary">
                1
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <button className="inline-flex items-center px-2 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
