

import type React from "react"

import { useRef, useEffect } from "react"
import { X } from "lucide-react"

interface FloatingCardProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function FloatingCard({ isOpen, onClose, children }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div
        ref={cardRef}
        className="bg-white rounded-lg shadow-lg border border-gray-200 w-[450px] max-w-[90vw] max-h-[90vh] overflow-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="font-medium text-gray-900">Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

