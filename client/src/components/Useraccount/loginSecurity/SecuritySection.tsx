

import type React from "react"

// import { Switch } from "@/components/ui/switch"

interface SecuritySectionProps {
  icon: React.ReactNode
  title: string
  description: string
  actionText?: string
  isToggle?: boolean
  toggleValue?: boolean
  onToggle?: () => void
  onAction?: () => void
}

export default function SecuritySection({
  icon,
  title,
  description,
  actionText,
  isToggle = false,
  // toggleValue = false,
  // onToggle,
  onAction,
}: SecuritySectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-primary text-xl mr-3">{icon}</div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>

        <div>
          {isToggle ? (
            // <Switch checked={toggleValue} onCheckedChange={onToggle} className="data-[state=checked]:bg-primary" />
            <div>
                
            </div>
          ) : (
            <button onClick={onAction} className="text-primary hover:text-primary font-medium transition-colors">
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

