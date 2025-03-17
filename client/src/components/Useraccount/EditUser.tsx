"use client"

import { CiUser } from "react-icons/ci"
import UserFormEdit from "./edituser/UserFormEdit"
import Breadcrumb from "./edituser/Breadcrumb"
const info = [
  { title: "Fullname", content: "Gyaneswar", button: "edit" },
  { title: "Email address", content: "gyan*******5.com", button: "edit" },
  { title: "Phone number", content: "826****52", button: "add" },
]

export default function EditUser() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Breadcrumb />

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Edit Personal Info</h1>

          <div className="flex flex-col items-center md:items-start mb-8">
            <div className="relative group">
              <input type="file" id="fileInput" className="hidden" accept="image/*" />
              <label
                htmlFor="fileInput"
                className="w-32 h-32 md:w-36 md:h-36 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer 
                          hover:bg-gray-200 transition-all duration-300 border-2 border-dashed border-gray-300 group-hover:border-teal-500"
              >
                <CiUser className="text-gray-500 text-6xl md:text-7xl group-hover:text-teal-600 transition-colors" />
              </label>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">Change photo</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Upload a profile picture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {info.map((item, index) => (
              <UserFormEdit key={index} {...item} />
            ))}
          </div>

          <div className="mt-10 flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

