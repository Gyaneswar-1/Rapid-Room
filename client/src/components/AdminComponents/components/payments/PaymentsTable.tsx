"use client"

import { useState } from "react"
import { Eye, FileText, AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import type { Payment } from "./PaymentsView"
import FloatingCard from "../ui/FloatingCardProps"

interface PaymentsTableProps {
  activeSubTab: string
}

export default function PaymentsTable({ activeSubTab }: PaymentsTableProps) {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)

  // Mock data for payments
  const payments: Payment[] = [
    {
      id: "PAY-1001",
      bookingId: "BKG-5001",
      hotelName: "Sunset Beach Resort",
      hotelId: "HTL-1001",
      hostName: "John Smith",
      hostId: "HOST-501",
      guestName: "Alice Johnson",
      guestId: "USR-3001",
      amount: 450.0,
      platformFee: 54.0,
      hostPayout: 396.0,
      status: "completed",
      date: "2023-03-15",
      paymentMethod: "Credit Card",
    },
    {
      id: "PAY-1002",
      bookingId: "BKG-5002",
      hotelName: "Mountain View Lodge",
      hotelId: "HTL-1002",
      hostName: "Emma Johnson",
      hostId: "HOST-502",
      guestName: "Bob Williams",
      guestId: "USR-3002",
      amount: 680.0,
      platformFee: 81.6,
      hostPayout: 598.4,
      status: "completed",
      date: "2023-03-14",
      paymentMethod: "PayPal",
    },
    {
      id: "PAY-1003",
      bookingId: "BKG-5003",
      hotelName: "City Center Suites",
      hotelId: "HTL-1003",
      hostName: "Robert Chen",
      hostId: "HOST-503",
      guestName: "Carol Martinez",
      guestId: "USR-3003",
      amount: 320.0,
      platformFee: 38.4,
      hostPayout: 281.6,
      status: "pending",
      date: "2023-03-16",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "PAY-1004",
      bookingId: "BKG-5004",
      hotelName: "Lakeside Cabin",
      hotelId: "HTL-2104",
      hostName: "Lisa Garcia",
      hostId: "HOST-504",
      guestName: "David Wilson",
      guestId: "USR-3004",
      amount: 520.0,
      platformFee: 62.4,
      hostPayout: 457.6,
      status: "failed",
      date: "2023-03-13",
      paymentMethod: "Credit Card",
    },
    {
      id: "PAY-1005",
      bookingId: "BKG-5005",
      hotelName: "Oceanview Villa",
      hotelId: "HTL-2101",
      hostName: "David Wilson",
      hostId: "USR-2001",
      guestName: "Eva Brown",
      guestId: "USR-3005",
      amount: 890.0,
      platformFee: 106.8,
      hostPayout: 783.2,
      status: "refunded",
      date: "2023-03-10",
      paymentMethod: "PayPal",
    },
  ]

  // Filter payments based on active tab
  const filteredPayments = payments.filter((payment) => {
    if (activeSubTab === "all") return true
    return payment.status === activeSubTab
  })

  // Handle eye button click
  const handleViewDetails = (payment: Payment) => {
    setSelectedPayment(selectedPayment?.id === payment.id ? null : payment)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  // Calculate commission percentage
  const calculateCommissionPercentage = (payment: Payment) => {
    return ((payment.platformFee / payment.amount) * 100).toFixed(1) + "%"
  }

  return (
    <div className="overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platform Fee
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredPayments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">{payment.hotelName}</p>
                  <p className="text-xs text-gray-500">Host: {payment.hostName}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.guestName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(payment.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(payment.platformFee)}</p>
                  <p className="text-xs text-gray-500">{calculateCommissionPercentage(payment)}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(payment.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    payment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : payment.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : payment.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button onClick={() => handleViewDetails(payment)} className="text-gray-600 hover:text-gray-900">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <FileText className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Floating Card for Payment Details */}
      <FloatingCard isOpen={!!selectedPayment} onClose={() => setSelectedPayment(null)}>
        {selectedPayment && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                <p className="text-sm text-gray-500">Transaction ID: {selectedPayment.id}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  selectedPayment.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : selectedPayment.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : selectedPayment.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                }`}
              >
                {selectedPayment.status === "completed" && <CheckCircle className="w-3.5 h-3.5 mr-1" />}
                {selectedPayment.status === "pending" && <RefreshCw className="w-3.5 h-3.5 mr-1" />}
                {selectedPayment.status === "failed" && <AlertCircle className="w-3.5 h-3.5 mr-1" />}
                {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Booking ID</p>
                <p className="text-sm text-gray-900">{selectedPayment.bookingId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Date</p>
                <p className="text-sm text-gray-900">{new Date(selectedPayment.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-sm text-gray-900">{selectedPayment.paymentMethod}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Hotel Information</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-900">{selectedPayment.hotelName}</p>
                <p className="text-sm text-gray-500">ID: {selectedPayment.hotelId}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Host</p>
                <p className="text-sm text-gray-900">{selectedPayment.hostName}</p>
                <p className="text-xs text-gray-500">ID: {selectedPayment.hostId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Guest</p>
                <p className="text-sm text-gray-900">{selectedPayment.guestName}</p>
                <p className="text-xs text-gray-500">ID: {selectedPayment.guestId}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Payment Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedPayment.amount)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    Platform Fee ({calculateCommissionPercentage(selectedPayment)})
                  </p>
                  <p className="text-sm font-medium text-primary">{formatCurrency(selectedPayment.platformFee)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Host Payout</p>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(selectedPayment.hostPayout)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50">
                Download Receipt
              </button>
              {selectedPayment.status === "pending" && (
                <button className="px-3 py-1.5 bg-primary text-white text-sm font-medium rounded hover:bg-primary">
                  Process Payment
                </button>
              )}
            </div>
          </div>
        )}
      </FloatingCard>
    </div>
  )
}

