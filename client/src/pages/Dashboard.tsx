

import { useState, useEffect } from "react"
import { HostSidebar } from "../components/HostingComponents/components/host/host-sidebar"
import { HostHeader } from "../components/HostingComponents/components/host/host-header"
import { Outlet } from "react-router-dom"

export default function HostLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <HostSidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <HostHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

