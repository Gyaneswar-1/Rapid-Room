"use client"

import { useState } from "react"
import { CiEdit, CiCirclePlus } from "react-icons/ci"

interface UserFormEditProps {
  title: string
  content: string
  button: "edit" | "add"
}

export default function UserFormEdit({ title, content, button }: UserFormEditProps) {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <button
          onClick={toggleEdit}
          className="text-teal-600 hover:text-teal-800 transition-colors flex items-center text-sm"
        >
          {button === "edit" ? (
            <>
              <CiEdit className="mr-1" /> Edit
            </>
          ) : (
            <>
              <CiCirclePlus className="mr-1" /> Add
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            defaultValue={content}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex justify-end mt-3 space-x-2">
            <button
              onClick={toggleEdit}
              className="px-3 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-3 py-1 text-xs bg-teal-600 text-white rounded-md hover:bg-teal-700">Save</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 font-medium">{content}</p>
      )}
    </div>
  )
}

