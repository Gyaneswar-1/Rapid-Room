"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  selectedDate: Date | null
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

export default function Calendar({ selectedDate, onChange, minDate, maxDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date())

  // Set day to 1 to get the first day of the month
  currentMonth.setDate(1)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Get the number of days in the current month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Get the day of the week for the first day of the month (0-6, where 0 is Sunday)
  const firstDayOfMonth = currentMonth.getDay()

  // Create an array of day numbers for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Create an array of empty cells for days before the first day of the month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => null)

  // Combine empty cells and days
  const calendarDays = [...emptyCells, ...days]

  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // Check if a date is the selected date
  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  // Check if a date is before the minimum date
  const isBeforeMinDate = (day: number) => {
    if (!minDate) return false

    const date = new Date(currentMonth)
    date.setDate(day)

    return date < minDate
  }

  // Check if a date is after the maximum date
  const isAfterMaxDate = (day: number) => {
    if (!maxDate) return false

    const date = new Date(currentMonth)
    date.setDate(day)

    return date > maxDate
  }

  // Check if a date is disabled
  const isDisabled = (day: number) => {
    return isBeforeMinDate(day) || isAfterMaxDate(day)
  }

  // Handle date selection
  const handleDateClick = (day: number) => {
    if (isDisabled(day)) return

    const newDate = new Date(currentMonth)
    newDate.setDate(day)
    onChange(newDate)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Days of week headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div key={index} className="text-center py-1">
            {day !== null ? (
              <button
                onClick={() => handleDateClick(day)}
                disabled={isDisabled(day)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${isSelectedDate(day) ? "bg-gray-900 text-white" : "hover:bg-gray-100"}
                  ${isDisabled(day) ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                `}
              >
                {day}
              </button>
            ) : (
              <span></span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

