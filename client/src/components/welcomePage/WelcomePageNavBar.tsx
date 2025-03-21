"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

export default function WelcomePageNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // In Next.js, we'd use a different approach for checking login status
  // This is just to maintain the logic from your original code
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("loggedin") : false

  const handleLogout = async () => {
    // Implement your logout logic here
    console.log("Logging out...")
    // For demo purposes, we'll just simulate the logout
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedin")
      window.location.reload()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <img src="/placeholder.svg?height=40&width=40" alt="RapidRoom Logo"  className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden md:block">RapidRoom</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/destinations" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Destinations
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-2 border-2 border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                  onClick={() => console.log("Sign up clicked")}
                >
                  Sign Up
                </button>
                <button
                  className="px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                  onClick={() => console.log("Sign in clicked")}
                >
                  Sign In
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* Custom Dropdown Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-teal-600" />
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Content */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-900">My Account</p>
                        </div>

                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/bookings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Settings
                        </Link>

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => {
                              handleLogout()
                              setIsDropdownOpen(false)
                            }}
                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  className="px-4 py-2 border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/destinations"
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Destinations
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              <div className="pt-4 border-t flex flex-col space-y-3">
                {!isLoggedIn ? (
                  <>
                    <button
                      className="w-full px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      onClick={() => {
                        console.log("Sign in clicked")
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="w-full px-4 py-3 border-2 border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                      onClick={() => {
                        console.log("Sign up clicked")
                        setIsMenuOpen(false)
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-700 hover:text-teal-600 font-medium transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                    <button
                      className="w-full px-4 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

