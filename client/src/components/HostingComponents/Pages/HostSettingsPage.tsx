import type React from "react"

import { useState } from "react"
import HostSidebar from "../components/analytics/HostSidebar"
import HostHeader from "../components/analytics/HostHeader"
import { notifySuccess } from "../../../lib/Toast"

export default function HostSettingsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Mock data for the host
  const hostData = {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    bio: "Experienced host with a passion for hospitality. I love meeting new people and providing them with a comfortable stay.",
  }

  const [profileData, setProfileData] = useState({
    name: hostData.name,
    email: hostData.email,
    phone: hostData.phone,
    address: hostData.address,
    bio: hostData.bio,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newBookingAlert: true,
    bookingCancellationAlert: true,
    reviewAlert: true,
    paymentAlert: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethod: "bank",
    accountName: "John Smith",
    accountNumber: "****4567",
    routingNumber: "****8901",
    payoutSchedule: "weekly",
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would make an API call to update the profile
    notifySuccess("Profile updated successfully!")
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would make an API call to update the notification settings
    notifySuccess("Notification settings updated successfully!")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would make an API call to update the payment settings
    notifySuccess("Payment settings updated successfully!")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <HostSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HostHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
              </div>
            </div>

            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="flex items-center">
                        <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={hostData.avatar || "/placeholder.svg"}
                            alt={hostData.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-5">
                          <button
                            type="button"
                            className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            Change
                          </button>
                          <p className="mt-1 text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          name="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleNotificationSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              smsNotifications: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                          SMS Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via SMS</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newBookingAlert"
                          name="newBookingAlert"
                          type="checkbox"
                          checked={notificationSettings.newBookingAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              newBookingAlert: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newBookingAlert" className="font-medium text-gray-700">
                          New Booking Alerts
                        </label>
                        <p className="text-gray-500">Get notified when a new booking is made</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="bookingCancellationAlert"
                          name="bookingCancellationAlert"
                          type="checkbox"
                          checked={notificationSettings.bookingCancellationAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              bookingCancellationAlert: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="bookingCancellationAlert" className="font-medium text-gray-700">
                          Booking Cancellation Alerts
                        </label>
                        <p className="text-gray-500">Get notified when a booking is cancelled</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reviewAlert"
                          name="reviewAlert"
                          type="checkbox"
                          checked={notificationSettings.reviewAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              reviewAlert: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="reviewAlert" className="font-medium text-gray-700">
                          Review Alerts
                        </label>
                        <p className="text-gray-500">Get notified when a guest leaves a review</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="paymentAlert"
                          name="paymentAlert"
                          type="checkbox"
                          checked={notificationSettings.paymentAlert}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              paymentAlert: e.target.checked,
                            })
                          }
                          className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="paymentAlert" className="font-medium text-gray-700">
                          Payment Alerts
                        </label>
                        <p className="text-gray-500">Get notified about payment activities</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Payment Settings</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={paymentSettings.paymentMethod}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentMethod: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        <option value="bank">Bank Account</option>
                        <option value="paypal">PayPal</option>
                        <option value="card">Credit Card</option>
                      </select>
                    </div>

                    {paymentSettings.paymentMethod === "bank" && (
                      <>
                        <div>
                          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                            Account Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="accountName"
                              id="accountName"
                              value={paymentSettings.accountName}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, accountName: e.target.value })}
                              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                            Account Number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="accountNumber"
                              id="accountNumber"
                              value={paymentSettings.accountNumber}
                              disabled
                              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
                            Routing Number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="routingNumber"
                              id="routingNumber"
                              value={paymentSettings.routingNumber}
                              disabled
                              className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label htmlFor="payoutSchedule" className="block text-sm font-medium text-gray-700">
                        Payout Schedule
                      </label>
                      <select
                        id="payoutSchedule"
                        name="payoutSchedule"
                        value={paymentSettings.payoutSchedule}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, payoutSchedule: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Update Payment Information
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

