

import { Building2, Users, Eye, CheckCircle, XCircle, ArrowUpRight } from "lucide-react"

interface PendingApprovalsProps {
  handleAction: (type: string, id: string, action: "approve" | "reject") => void
}

export default function PendingApprovals({ handleAction }: PendingApprovalsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Pending Approvals</h2>
        <button className="text-sm text-primary hover:text-primary font-medium flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New Hotel: Sunset Beach Resort</p>
              <p className="text-sm text-gray-500">Submitted by John Smith • 2 hours ago</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("hotel", "HTL-1001", "approve")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("hotel", "HTL-1001", "reject")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Host Verification: Lisa Garcia</p>
              <p className="text-sm text-gray-500">Submitted ID verification • 5 hours ago</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("host", "USR-2002", "approve")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("host", "USR-2002", "reject")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-100">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New Hotel: Mountain View Lodge</p>
              <p className="text-sm text-gray-500">Submitted by Emma Johnson • 1 day ago</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-1.5 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700">
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("hotel", "HTL-1002", "approve")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-green-600 hover:text-green-800"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleAction("hotel", "HTL-1002", "reject")}
              className="p-1.5 bg-white rounded-lg border border-gray-200 text-red-600 hover:text-red-800"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

