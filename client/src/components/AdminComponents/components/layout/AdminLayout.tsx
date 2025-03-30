

import type React from "react"

import { useState, useEffect } from "react"
import Sidebar from "../Sidebar"
import Header from "../Header"
import { HelpCircle } from "lucide-react"
import Modal from "../ui/Modal"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<any>(null)

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Function to open modal with specific content
  const openModal = (type: string, item: any) => {
    setModalContent({ type, item })
    setShowModal(true)
  }

  // Function to handle approval/rejection
  const handleAction = (type: string, id: string, action: "approve" | "reject") => {
    console.log(`${action} ${type} with ID: ${id}`)
    // Here you would make an API call to update the status
    setShowModal(false)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header isMobile={isMobile} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">{children}</main>
      </div>

      {/* Modal */}
      {showModal && <Modal modalContent={modalContent} setShowModal={setShowModal} handleAction={handleAction} />}

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 p-3 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  )
}

