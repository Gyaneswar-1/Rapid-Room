

interface HotelsTabsProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
}

export default function HotelsTabs({ activeSubTab, setActiveSubTab }: HotelsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveSubTab("pending")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "pending"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setActiveSubTab("approved")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "approved"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setActiveSubTab("rejected")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "rejected"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Rejected
        </button>
        <button
          onClick={() => setActiveSubTab("all")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          All Hotels
        </button>
      </nav>
    </div>
  )
}

