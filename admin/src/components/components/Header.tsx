

import { Menu } from "lucide-react"

interface HeaderProps {
  isMobile: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export default function Header({ isMobile, isSidebarOpen, setIsSidebarOpen }: HeaderProps) {

  // Get page title based on current path

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between">
        {isMobile && !isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu className="w-6 h-6 m-2" />
          </button>
        )}


      </div>
    </header>
  )
}

