

import { Calendar } from "lucide-react"

interface ModalProps {
  modalContent: {
    type: string
    item: any
  }
  setShowModal: (show: boolean) => void
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function Modal({ modalContent, setShowModal, handleAction }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {modalContent?.type === "hotel" ? (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Hotel Details</h3>
                  <div className="mt-2 space-y-4">
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                      <img
                        src={modalContent.item.images?.[0] || "/placeholder.svg"}
                        alt={modalContent.item.name || modalContent.item.hotelName}
                        className="object-cover"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Hotel Name</p>
                        <p className="text-sm text-gray-900">{modalContent.item.name || modalContent.item.hotelName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-sm text-gray-900">
                          {modalContent.item.location || modalContent.item.address?.city || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Host</p>
                        <p className="text-sm text-gray-900">{modalContent.item.host || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Submission Date</p>
                        <p className="text-sm text-gray-900">
                          {modalContent.item.submitted
                            ? new Date(modalContent.item.submitted).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            modalContent.item.status === "pending" || modalContent.item.status === "PENDING"
                              ? "bg-amber-100 text-amber-800"
                              : modalContent.item.status === "approved" || modalContent.item.status === "APPROVED"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {typeof modalContent.item.status === "string"
                            ? modalContent.item.status.charAt(0).toUpperCase() +
                              modalContent.item.status.slice(1).toLowerCase()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                      <p className="text-sm text-gray-900">
                        This is a beautiful property located in{" "}
                        {modalContent.item.location || modalContent.item.address?.city || "N/A"}. The hotel offers
                        stunning views and excellent amenities for guests.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Host Verification Details</h3>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={modalContent.item.avatar || "/placeholder.svg"}
                          alt={modalContent.item.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900">{modalContent.item.name}</p>
                        <p className="text-sm text-gray-500">{modalContent.item.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-sm text-gray-900">{modalContent.item.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-sm text-gray-900">{modalContent.item.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">ID Type</p>
                        <p className="text-sm text-gray-900">{modalContent.item.govIdType}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">ID Number</p>
                        <p className="text-sm text-gray-900">{modalContent.item.govId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Submission Date</p>
                        <p className="text-sm text-gray-900">
                          {new Date(modalContent.item.submitted).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            modalContent.item.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : modalContent.item.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {modalContent.item.status.charAt(0).toUpperCase() + modalContent.item.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">Government ID</p>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <Calendar className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">ID Document Preview</p>
                            <p className="text-xs text-gray-400">
                              For security reasons, actual document is only viewable after authentication
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {(modalContent?.item.status === "pending" || modalContent?.item.status === "PENDING") && (
              <>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAction(modalContent.type, modalContent.item.id, "approve")}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleAction(modalContent.type, modalContent.item.id, "reject")}
                >
                  Reject
                </button>
              </>
            )}
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

