import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Star, Trash } from "lucide-react"

export function HostedHotels() {
  const hotels = [
    {
      id: 1,
      name: "Seaside Resort",
      location: "Miami, FL",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.8,
      reviews: 124,
      status: "active",
      occupancyRate: "85%",
    },
    {
      id: 2,
      name: "Mountain Lodge",
      location: "Aspen, CO",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.6,
      reviews: 98,
      status: "active",
      occupancyRate: "72%",
    },
    {
      id: 3,
      name: "City Suites",
      location: "New York, NY",
      image: "/placeholder.svg?height=100&width=150",
      rating: 4.5,
      reviews: 156,
      status: "maintenance",
      occupancyRate: "0%",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Hotels</CardTitle>
          <CardDescription>Manage your listed properties</CardDescription>
        </div>
        <Button size="sm">Add New Hotel</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="overflow-hidden rounded-lg border bg-white">
              <div className="relative h-[150px] w-full">
                <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                <Badge
                  className={`absolute right-2 top-2 ${
                    hotel.status === "active"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  {hotel.status === "active" ? "Active" : "Maintenance"}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium">Occupancy:</span> {hotel.occupancyRate}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

