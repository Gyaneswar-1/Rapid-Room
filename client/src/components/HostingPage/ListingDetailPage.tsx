"use client";

import { useState } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlinePhotograph,
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineTrash,
  HiOutlinePencil,
} from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

// Mock data for a single listing
const mockListing = {
  id: "1",
  title: "Beachfront Villa",
  description:
    "Beautiful beachfront villa with stunning ocean views. Perfect for a relaxing getaway with family and friends. Enjoy the private beach access and luxurious amenities.",
  location: "Malibu, CA",
  type: "Entire villa",
  bedrooms: 4,
  bathrooms: 3,
  maxGuests: 8,
  amenities: [
    "Wi-Fi",
    "Kitchen",
    "Pool",
    "Hot tub",
    "Beach access",
    "Air conditioning",
    "Free parking",
  ],
  rating: 4.9,
  reviews: 128,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  price: 350,
  isActive: true,
};

export default function ListingDetailPage() {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();

  const handleDelete = () => {
    // In a real app, you would call an API to delete the listing
    console.log(`Deleting listing ${id}`);
    setIsDeleteModalOpen(false);
    navigate("/hosting/listings");
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <HiOutlineArrowLeft className="mr-1.5 h-5 w-5" />
        Back to listings
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mockListing.title}
          </h1>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <HiOutlineLocationMarker className="mr-1 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>{mockListing.location}</span>
            <span className="mx-2">·</span>
            <div className="flex items-center">
              <HiOutlineStar className="h-4 w-4 text-teal-500" />
              <span className="ml-1 text-sm text-gray-700">
                {mockListing.rating}
              </span>
              <span className="mx-1 text-sm text-gray-500">·</span>
              <span className="text-sm text-gray-500">
                {mockListing.reviews} reviews
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-4 lg:mt-0">
          <button
            onClick={() => navigate(`/hosting/listings/${id}/edit`)}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors"
          >
            <HiOutlinePencil className="mr-1.5 h-4 w-4" />
            Edit listing
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            <HiOutlineTrash className="mr-1.5 h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {mockListing.images.map((image, index) => (
          <div key={index} className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={`${mockListing.title} - Image ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-600">{mockListing.description}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-y-2">
              {mockListing.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Listing details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <HiOutlineHome className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Property type
                  </p>
                  <p className="text-sm text-gray-500">{mockListing.type}</p>
                </div>
              </div>

              <div className="flex items-center">
                <HiOutlineUsers className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Capacity</p>
                  <p className="text-sm text-gray-500">
                    {mockListing.bedrooms} bedrooms · {mockListing.bathrooms}{" "}
                    bathrooms · Up to {mockListing.maxGuests} guests
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Price</p>
                  <p className="text-sm text-gray-500">
                    ${mockListing.price} per night
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <HiOutlinePhotograph className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Photos</p>
                  <p className="text-sm text-gray-500">
                    {mockListing.images.length} photos
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    mockListing.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {mockListing.isActive ? "Active" : "Inactive"}
                </div>

                <button className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors">
                  {mockListing.isActive
                    ? "Deactivate listing"
                    : "Activate listing"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete listing
            </h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this listing? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
