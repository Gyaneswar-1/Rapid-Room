"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, ChevronDown, Menu, Search, X } from "lucide-react"

export function HostHeader({ toggleSidebar }) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notificationsRef = useRef(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <button
          className="mr-2 p-2 rounded-md hover:bg-gray-100 md:hidden"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </button>

        <div className="flex-1">
          {showSearch ? (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-gray-300 py-2 pl-8 pr-4 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 md:w-[300px] lg:w-[400px]"
              />
              <button className="absolute right-0 top-0 p-2 md:hidden" onClick={() => setShowSearch(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Host Dashboard</h2>
              <button
                className="ml-auto p-2 rounded-md hover:bg-gray-100 md:hidden"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative ml-auto mr-4 hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="rounded-md border border-gray-300 py-2 pl-8 pr-4 w-[300px] focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 lg:w-[400px]"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            className="relative p-2 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-2 px-4 text-sm font-medium border-b">Notifications</div>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  New reservation request
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Payment received
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Guest review submitted
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User Menu Dropdown */}
        <div className="relative ml-2" ref={userMenuRef}>
          <button
            className="flex items-center gap-1.5 p-1 rounded-md hover:bg-gray-100"
            aria-label="User menu"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="relative h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img src="/placeholder.svg?height=32&width=32" alt="User avatar" className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">JD</div>
            </div>
            <span className="hidden text-sm font-medium md:inline">John Doe</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-2 px-4 text-sm font-medium border-b">My Account</div>
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Help & Support
                </a>
              </div>
              <div className="border-t py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Log out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

