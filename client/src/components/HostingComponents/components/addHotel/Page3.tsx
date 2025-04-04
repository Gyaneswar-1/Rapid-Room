"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { BiBuildingHouse, BiHome, BiMapPin, BiCloudUpload, BiTrash, BiCurrentLocation } from "react-icons/bi"

// Mock function to simulate image upload
const uploadImage = async (file: File): Promise<string> => {
  // In a real implementation, this would upload to a server/cloud storage
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Create a fake URL that would normally come from your server
      const fakeUrl = URL.createObjectURL(file)
      resolve(fakeUrl)
    }, 1000)
  })
}

const Page3 = ({ register, errors, setValue }: { register: any; errors: any; setValue: any }) => {
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [location, setLocation] = useState({ lat: 20.5937, lng: 78.9629 }) // Default to center of India
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  // Register images with form
  useEffect(() => {
    register("images", { value: images })
  }, [images, register])

  // Register location with form
  useEffect(() => {
    setValue("latitude", location.lat.toFixed(6))
    setValue("longitude", location.lng.toFixed(6))
  }, [location, setValue])

  // Load Google Maps
  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)
    }

    // Initialize map once script is loaded
    const initializeMap = () => {
      if (mapRef.current) {
        const mapOptions: google.maps.MapOptions = {
          center: { lat: location.lat, lng: location.lng },
          zoom: 5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }

        const map = new google.maps.Map(mapRef.current, mapOptions)
        googleMapRef.current = map

        // Add marker at initial position
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
        })
        markerRef.current = marker

        // Update location when marker is dragged
        marker.addListener("dragend", () => {
          const position = marker.getPosition()
          if (position) {
            setLocation({
              lat: position.lat(),
              lng: position.lng(),
            })
          }
        })

        // Update marker when map is clicked
        map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (event.latLng && markerRef.current) {
            markerRef.current.setPosition(event.latLng)
            setLocation({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          }
        })

        setMapLoaded(true)
      }
    }

    // For demo purposes, we'll simulate the map without actually loading Google Maps API
    // In a real app, you would uncomment the loadGoogleMapsScript() call
    // loadGoogleMapsScript()

    // Simulate map loading for demo
    setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => {
      // Clean up any map resources if needed
    }
  }, [])

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true)

      try {
        const uploadPromises = Array.from(e.target.files).map((file) => uploadImage(file))
        const uploadedUrls = await Promise.all(uploadPromises)

        setImages((prev) => [...prev, ...uploadedUrls])
        setValue("images", [...images, ...uploadedUrls])
      } catch (error) {
        console.error("Error uploading images:", error)
        // Show error notification here
      } finally {
        setUploading(false)
      }
    }
  }

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...images]
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index])
    newImages.splice(index, 1)
    setImages(newImages)
    setValue("images", newImages)
  }

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(newLocation)

          // Update map and marker if they exist
          if (googleMapRef.current && markerRef.current) {
            googleMapRef.current.setCenter(newLocation)
            googleMapRef.current.setZoom(14)
            markerRef.current.setPosition(newLocation)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          // Show error notification here
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser")
      // Show error notification here
    }
  }

  const hotelTypes = [
    { value: "CITY", label: "city" },
    { value: "BEACH", label: "beach" },
    { value: "MOUNTAIN", label: "mountain" },
    { value: "COUNTRYSIDE", label: "countryside" },
    { value: "RESORT", label: "resort" },
    { value: "BUDGET", label: "budget" },
    { value: "LUXURY", label: "luxury" },
    { value: "AMAZING_VIEWS", label: "amazing views" },
    { value: "AMAZING_POOLS", label: "amazing pools" },
    { value: "FARMS", label: "farms" },
    { value: "HISTORICAL_HOMES", label: "historical homes" },
    { value: "SURFING", label: "surfing" },
    { value: "BEACHFRONT", label: "beachfront" },
    { value: "LAKEFRONT", label: "lakefront" },
    { value: "CASTLES", label: "castles" },
    { value: "CAMPING", label: "camping" },
    { value: "BOATS", label: "boats" },
    { value: "TROPICAL", label: "tropical" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Where is your hotel located?</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Country */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiMapPin className="w-5 h-5 text-teal-600" />
              Country
            </label>
            <input
              {...register("country", { required: "Country is required" })}
              type="text"
              placeholder="e.g. Japan"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
          </div>

          {/* State */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              State/Province
            </label>
            <input
              {...register("state", { required: "State is required" })}
              type="text"
              placeholder="e.g. Odisha"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiHome className="w-5 h-5 text-teal-600" />
              City
            </label>
            <input
              {...register("city", { required: "City is required" })}
              type="text"
              placeholder="e.g. Cuttack"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          {/* Street */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Street
            </label>
            <input
              {...register("street", { required: "Street is required" })}
              type="text"
              placeholder="e.g. nh45"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>}
          </div>

          {/* Zipcode */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiBuildingHouse className="w-5 h-5 text-teal-600" />
              Zipcode
            </label>
            <input
              {...register("zipcode", { required: "Zipcode is required" })}
              type="text"
              placeholder="e.g. 755049"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.zipcode && <p className="mt-1 text-sm text-red-600">{errors.zipcode.message}</p>}
          </div>

          {/* Number of Rooms */}
          <div>
            <label className="flex items-center gap-2 text-base font-medium text-gray-900 mb-2">
              <BiMapPin className="w-5 h-5 text-teal-600" />
              Number of Rooms
            </label>
            <input
              {...register("numberOfRooms", {
                required: "Number of rooms is required",
                min: { value: 1, message: "Must have at least 1 room" },
              })}
              type="number"
              placeholder="e.g. 10"
              className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
            {errors.numberOfRooms && <p className="mt-1 text-sm text-red-600">{errors.numberOfRooms.message}</p>}
          </div>
        </div>

        {/* Hotel Type */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hotel Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {hotelTypes.map((type) => (
              <label key={type.value} className="relative">
                <input
                  type="radio"
                  {...register("type", { required: "Hotel type is required" })}
                  value={type.value}
                  className="peer sr-only"
                />
                <div className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 peer-checked:border-teal-600 peer-checked:bg-teal-50 transition-colors cursor-pointer">
                  <span className="font-medium peer-checked:text-teal-700 capitalize">{type.label}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        {/* Map Location */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Map Location</h2>
          <p className="text-sm text-gray-500 mb-4">
            Click on the map to set your hotel's location or use the "Get Current Location" button.
          </p>

          <div className="relative mb-4">
            {/* Map container */}
            <div
              ref={mapRef}
              className="w-full h-[300px] rounded-lg border border-gray-300 bg-gray-100 overflow-hidden"
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                </div>
              )}

              {/* Simulated map for demo */}
              {mapLoaded && (
                <div className="w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=20.5937,78.9629&zoom=5&size=600x400&key=DEMO_KEY')] bg-cover bg-center relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-teal-600 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Get current location button */}
            <button
              type="button"
              onClick={getCurrentLocation}
              className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <BiCurrentLocation className="w-5 h-5 text-teal-600" />
            </button>
          </div>

          {/* Display coordinates */}
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Selected Location:</span>
              <span className="ml-2 text-gray-600">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </span>
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              <BiCurrentLocation className="w-4 h-4" />
              Get Current Location
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hotel Images</h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload high-quality images of your hotel. You can upload multiple images.
          </p>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
            <label htmlFor="images" className="flex flex-col items-center justify-center cursor-pointer">
              {uploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mb-2"></div>
              ) : (
                <BiCloudUpload className="w-12 h-12 text-teal-600 mb-2" />
              )}
              <span className="text-lg font-medium text-gray-900">
                {uploading ? "Uploading..." : "Click to upload images"}
              </span>
              <span className="text-sm text-gray-500 mt-1">or drag and drop</span>
              <span className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</span>
            </label>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Uploaded Images ({images.length})</h3>
                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setImages([])}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove All
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  >
                    <img
                      src={url || "/placeholder.svg"}
                      alt={`Hotel image ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <BiTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page3

