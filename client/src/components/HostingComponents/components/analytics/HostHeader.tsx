"use client"

import { useState, useRef, useEffect } from "react"
import { MarsIcon, BellIcon, Search } from "lucide-react"

interface HostHeaderProps {
  hostName: string
  hostAvatar: string
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function HostHeader({ hostName, hostAvatar, isSidebarOpen, setIsSidebarOpen }: HostHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <MarsIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center">
            {/* Notifications dropdown */}
            <div className="relative ml-4" ref={notificationsRef}>
              <button
                type="button"
                className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  setIsProfileOpen(false)
                }}
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </div>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <a href="#" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/placeholder.svg?height=40&width=40"
                            alt="User avatar"
                          />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">New Booking</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Emma Wilson booked Deluxe Ocean View for Apr 15-20
                          </p>
                          <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="/placeholder.svg?height=40&width=40"
                            alt="User avatar"
                          />
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">New Review</p>
                          <p className="mt-1 text-sm text-gray-500">
                            Michael Brown left a 5-star review for Mountain Lodge
                          </p>
                          <p className="mt-1 text-xs text-gray-400">1 day ago</p>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="block px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <svg
                              className="h-6 w-6 text-indigo-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">Payment Received</p>
                          <p className="mt-1 text-sm text-gray-500">You received a payout of $1,850.00</p>
                          <p className="mt-1 text-xs text-gray-400">3 days ago</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="border-t border-gray-100 py-2 px-4">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View all notifications
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-4" ref={profileRef}>
              <button
                type="button"
                className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen)
                  setIsNotificationsOpen(false)
                }}
              >
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src={hostAvatar || "/placeholder.svg"} alt={hostName} />
              </button>

              {/* Profile dropdown panel */}
              {isProfileOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{hostName}</p>
                    <p className="text-sm text-gray-500 truncate">host@example.com</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HostHeader

