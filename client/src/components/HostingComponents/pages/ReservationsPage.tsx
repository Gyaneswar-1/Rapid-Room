import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ReservationsPage() {
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
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export</Button>
          <Button>Add Reservation</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={reservation.guest.avatar} />
                        <AvatarFallback>{reservation.guest.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{reservation.guest.name}</div>
                        <div className="text-sm text-gray-500">
                          {reservation.hotel} - {reservation.room}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <div className="text-sm font-medium">Check-in</div>
                        <div className="text-sm text-gray-500">{reservation.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Check-out</div>
                        <div className="text-sm text-gray-500">{reservation.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Guests</div>
                        <div className="text-sm text-gray-500">{reservation.guests}</div>
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
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations
                  .filter((r) => r.status === "confirmed")
                  .map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={reservation.guest.avatar} />
                          <AvatarFallback>{reservation.guest.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{reservation.guest.name}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.hotel} - {reservation.room}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <div className="text-sm font-medium">Check-in</div>
                          <div className="text-sm text-gray-500">{reservation.checkIn}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Check-out</div>
                          <div className="text-sm text-gray-500">{reservation.checkOut}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Guests</div>
                          <div className="text-sm text-gray-500">{reservation.guests}</div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>
                        <div className="font-medium">{reservation.amount}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservations
                  .filter((r) => r.status === "pending")
                  .map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={reservation.guest.avatar} />
                          <AvatarFallback>{reservation.guest.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{reservation.guest.name}</div>
                          <div className="text-sm text-gray-500">
                            {reservation.hotel} - {reservation.room}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <div className="text-sm font-medium">Check-in</div>
                          <div className="text-sm text-gray-500">{reservation.checkIn}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Check-out</div>
                          <div className="text-sm text-gray-500">{reservation.checkOut}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Guests</div>
                          <div className="text-sm text-gray-500">{reservation.guests}</div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                        <div className="font-medium">{reservation.amount}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-gray-500">No cancelled reservations found.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

