
import { CiLocationOn } from "react-icons/ci"
import Breadcrumb from "./edituser/Breadcrumb"
import AddressFormEdit from "./edituseraddress/UserAddressEdit"

const addressInfo = [
  { title: "Street", content: "123 Main Street", button: "edit" },
  { title: "City", content: "San Francisco", button: "edit" },
  { title: "State", content: "California", button: "edit" },
  { title: "Zip Code", content: "94105", button: "edit" },
  { title: "Country", content: "United States", button: "edit" },
  { title: "Longitude", content: "-122.4194", button: "edit" },
  { title: "Latitude", content: "37.7749", button: "edit" },
]

export default function PersonalAddress() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Breadcrumb />

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-4">
          <div className="flex items-center mb-6">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <CiLocationOn className="text-teal-600 text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Edit Personal Address</h1>
          </div>

          <p className="text-gray-600 mb-8">
            Update your address information to help us find the best accommodations for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addressInfo.map((item, index) => (
              <AddressFormEdit key={index} {...item} />
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

