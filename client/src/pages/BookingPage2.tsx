"use client"

import type React from "react"

import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
import {
  Heart,
  Share,
  ArrowLeft,
  Star,
  Key,
  MessageSquare,
  MapPin,
  Tag,
  ParkingMeter,
  MousePointer2,
  SprayCan,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ImageCarousel from "../components/BookingPage/image-carousel"

export default function BookingPage() {
//   const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [hotelData, setHotelData] = useState<any>(null)

  // Example hotel data structure
  const mockHotelData = {
    id: 1,
    type: "Luxury Villa",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    address: {
      city: "Miami",
      street: "Ocean Drive",
      state: "Florida",
      country: "USA",
      longitude: -80.13,
      latitude: 25.7907,
    },
    description:
      "This stunning beachfront villa offers panoramic ocean views and modern luxury amenities. Perfect for a relaxing getaway with family or friends.",
    roomType: "Entire villa",
    perNight: 299,
    cleaningFee: 150,
    host: {
      fullName: "Sarah Johnson",
      email: "sarah@example.com",
      hostExperience: 5,
      hostRating: 4.9,
      hostResponseRate: 98,
      profileImage: "/placeholder.svg?height=150&width=150",
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      accuracy: 4.7,
      checkIn: 4.9,
      communication: 5.0,
      location: 4.8,
      value: 4.6,
      parking: 4.5,
    },
    totalReviews: 256,
    numberOfGuests: 6,
  }

  useEffect(() => {
    // Immediately set the mock data to avoid blank screen
    setHotelData(mockHotelData)

    // Simulate API delay for loading state demonstration
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading skeleton only if we don't have data yet
  if (isLoading && !hotelData) {
    return <BookingPageSkeleton />
  }

  // Ensure we have data before rendering
  if (!hotelData) {
    return <div className="container py-8">Loading hotel information...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="font-bold">R</span>
              </div>
              <span className="ml-2 font-semibold text-xl text-primary">RapidRoom</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share className="h-4 w-4" />
              <span className="hidden md:inline">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden md:inline">Save</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="container py-6 px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{hotelData.type}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>{hotelData.ratings.overall}</span>
            </div>
            <span>·</span>
            <span className="underline">{hotelData.totalReviews} reviews</span>
            <span>·</span>
            <span>
              {hotelData.address.city}, {hotelData.address.state}, {hotelData.address.country}
            </span>
          </div>
        </div>

        {/* Image Carousel */}
        <ImageCarousel images={hotelData.images} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between border-b pb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {hotelData.roomType} hosted by {hotelData.host.fullName}
                </h2>
                <p className="text-muted-foreground">{hotelData.numberOfGuests} guests</p>
              </div>
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={hotelData.host.profileImage || "/placeholder.svg"}
                    alt={hotelData.host.fullName}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="py-6 border-b">
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-muted-foreground">{hotelData.description}</p>
            </div>

            <div className="py-6 border-b">
              <h2 className="text-xl font-semibold mb-6">What guests are saying</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <RatingCard
                  title="Cleanliness"
                  rating={hotelData.ratings.cleanliness}
                  icon={<SprayCan className="h-5 w-5" />}
                />
                <RatingCard
                  title="Accuracy"
                  rating={hotelData.ratings.accuracy}
                  icon={<MousePointer2 className="h-5 w-5" />}
                />
                <RatingCard title="Check-in" rating={hotelData.ratings.checkIn} icon={<Key className="h-5 w-5" />} />
                <RatingCard
                  title="Communication"
                  rating={hotelData.ratings.communication}
                  icon={<MessageSquare className="h-5 w-5" />}
                />
                <RatingCard
                  title="Location"
                  rating={hotelData.ratings.location}
                  icon={<MapPin className="h-5 w-5" />}
                />
                <RatingCard title="Value" rating={hotelData.ratings.value} icon={<Tag className="h-5 w-5" />} />
                <RatingCard
                  title="Parking"
                  rating={hotelData.ratings.parking}
                  icon={<ParkingMeter className="h-5 w-5" />}
                />
              </div>
            </div>

            <div className="py-6 border-b">
              <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full overflow-hidden">
                    <Image
                      src={hotelData.host.profileImage || "/placeholder.svg"}
                      alt={hotelData.host.fullName}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{hotelData.host.fullName}</h3>
                  <p className="text-muted-foreground">Host for {hotelData.host.hostExperience} years</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>
                      {hotelData.host.hostRating} • {hotelData.totalReviews} reviews
                    </span>
                  </div>
                  <p className="mt-2 text-sm">Response rate: {hotelData.host.hostResponseRate}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-bold">${hotelData.perNight}</span>
                    <span className="text-muted-foreground"> night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    <span>{hotelData.ratings.overall} · </span>
                    <span className="ml-1 underline">{hotelData.totalReviews} reviews</span>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden mb-4">
                  <div className="grid grid-cols-2 divide-x border-b">
                    <div className="p-3">
                      <div className="text-xs uppercase font-medium">Check-in</div>
                      <div>3/15/2025</div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs uppercase font-medium">Checkout</div>
                      <div>3/20/2025</div>
                    </div>
                  </div>
                  <div className="p-3 border-b">
                    <div className="text-xs uppercase font-medium">Guests</div>
                    <div>2 guests</div>
                  </div>
                </div>

                <Button className="w-full mb-4">Reserve</Button>

                <div className="text-center text-sm">You won't be charged yet</div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="underline">${hotelData.perNight} x 5 nights</span>
                    <span>${hotelData.perNight * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>${hotelData.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>${Math.round(hotelData.perNight * 5 * 0.15)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t font-semibold">
                    <span>Total before taxes</span>
                    <span>
                      ${hotelData.perNight * 5 + hotelData.cleaningFee + Math.round(hotelData.perNight * 5 * 0.15)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function RatingCard({ title, rating, icon }: { title: string; rating: number; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{title}</span>
        <span>{rating}</span>
      </div>
      <div className="text-muted-foreground">{icon}</div>
    </div>
  )
}

function BookingPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Skeleton className="h-8 w-36" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </nav>

      <main className="container py-6 px-4 md:px-6">
        <Skeleton className="h-10 w-2/3 mb-2" />
        <Skeleton className="h-5 w-1/2 mb-6" />

        <Skeleton className="h-96 w-full rounded-lg mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-8 w-1/2 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full rounded-lg" />
          </div>
        </div>
      </main>
    </div>
  )
}

