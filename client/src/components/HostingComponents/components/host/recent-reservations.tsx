import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Reservations</CardTitle>
          <CardDescription>Manage your upcoming guest reservations</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="flex flex-col items-start justify-between gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={reservation.guest.avatar} />
                  <AvatarFallback>{reservation.guest.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{reservation.guest.name}</div>
                  <div className="text-sm text-gray-500">{reservation.hotel}</div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                <div className="text-sm text-gray-500">
                  {reservation.checkIn} - {reservation.checkOut}
                </div>
                <Badge
                  variant={reservation.status === "confirmed" ? "default" : "outline"}
                  className={
                    reservation.status === "confirmed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                </Badge>
                <div className="font-medium">{reservation.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

