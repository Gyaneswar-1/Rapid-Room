"use client"

interface PaymentsTabsProps {
  activeSubTab: string
  setActiveSubTab: (tab: string) => void
}

export default function PaymentsTabs({ activeSubTab, setActiveSubTab }: PaymentsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveSubTab("all")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          All Payments
        </button>
        <button
          onClick={() => setActiveSubTab("completed")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "completed"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveSubTab("pending")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "pending"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveSubTab("failed")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "failed"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Failed
        </button>
        <button
          onClick={() => setActiveSubTab("refunded")}
          className={`py-4 px-1 text-sm font-medium border-b-2 ${
            activeSubTab === "refunded"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Refunded
        </button>
      </nav>
    </div>
  )
}

