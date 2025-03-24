"use client"

import { useState, useRef, useEffect } from "react"
import { HiOutlineChevronDown } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"

export default function HostingTabs() {
  const {pathname} = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { name: "Today", href: "/dashbord/today" },
    { name: "Listings", href: "/dashbord/listings" },
    { name: "Messages", href: "/dashbord/messages" },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="border-b border-gray-200 mx-auto px-4 py-2 ">
      <div className="flex justify-between items-center">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href)
            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={`${
                  isActive
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Menu
            <HiOutlineChevronDown
              className={`ml-1 h-5 w-5 transition-transform ${menuOpen ? "transform rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  to="/dashbord/earnings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Earnings
                </Link>
                <Link
                  to="/dashbord/guidebook"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Guide Book
                </Link>
                <Link
                  to="/dashbord/listings/new"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  Create New Listing
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

