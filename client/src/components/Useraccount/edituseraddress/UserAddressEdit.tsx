

import { useState } from "react"
import { CiEdit } from "react-icons/ci"
import { CgClose } from "react-icons/cg"

interface AddressFieldProps {
  title: string
  content: string
  button: string
}

export default function AddressFormEdit({ title, content, button }: AddressFieldProps) {
  const [showModal, setShowModal] = useState(false)
  const [value, setValue] = useState(content)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSubmit = () => {
    // Here you would typically save the value to your backend
    toggleModal()
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <button
          onClick={toggleModal}
          className="text-teal-600 hover:text-teal-800 transition-colors flex items-center text-sm"
        >
          <CiEdit className="mr-1" /> {button}
        </button>
      </div>

      <p className="text-gray-800 font-medium">{value}</p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Edit your {title.toLowerCase()}</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700 transition-colors">
                <CgClose className="text-xl" />
              </button>
            </div>

            <div className="mt-4">
              <label htmlFor={title.replace(/\s+/g, "")} className="block text-sm font-medium text-gray-700 mb-1">
                {title}
              </label>
              <input
                type="text"
                id={title.replace(/\s+/g, "")}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter your ${title.toLowerCase()}`}
              />
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={toggleModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

