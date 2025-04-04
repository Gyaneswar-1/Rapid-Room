"use client"

export function RecentReservations() {
  const reservations = [
    {
      id: "RES-1234",
      guest: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      hotel: "Seaside Resort",
      checkIn: "Apr 15, 2023",
      checkOut: "Apr 20, 2023",
      status: "confirmed",
      amount: "$1,250.00",
    },
    {
      id: "RES-1235",
      guest: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MB",
      },
      hotel: "Mountain Lodge",
      checkIn: "Apr 18, 2023",
      checkOut: "Apr 22, 2023",
      status: "pending",
      amount: "$980.00",
    },
    {
      id: "RES-1236",
      guest: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      hotel: "City Suites",
      checkIn: "Apr 20, 2023",
      checkOut: "Apr 25, 2023",
      status: "confirmed",
      amount: "$1,450.00",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Reservations</h3>
          <p className="text-sm text-gray-500">Manage your upcoming guest reservations</p>
        </div>
        <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          View All
        </button>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-col items-start justify-between gap-2 rounded-lg border border-gray-200 p-3 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                  {reservation.guest.avatar ? (
                    <img
                      src={reservation.guest.avatar || "/placeholder.svg"}
                      alt={reservation.guest.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-indigo-600">
                      {reservation.guest.initials}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{reservation.guest.name}</div>
                  <div className="text-sm text-gray-500">{reservation.hotel}</div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                <div className="text-sm text-gray-500">
                  {reservation.checkIn} - {reservation.checkOut}
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    reservation.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                </span>
                <div className="font-medium">{reservation.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

