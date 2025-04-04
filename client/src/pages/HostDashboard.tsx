
import type React from "react"

import { useState, useEffect } from "react"
import HostSidebar from "../components/HostingComponents/components/analytics/HostSidebar"
import HostHeader from "../components/HostingComponents/components/analytics/HostHeader"
import { Outlet } from "react-router-dom"

export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      } else {
        setIsSidebarOpen(false)
      }
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  return (
    <div className="flex h-screen bg-gray-50">
      <HostSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <HostHeader
          hostName="John Smith"
          hostAvatar="/placeholder.svg?height=40&width=40"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

