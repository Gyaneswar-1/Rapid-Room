

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps {
  selectedDate: Date | null
  onChange: (date: Date) => void
  minDate?: Date
  maxDate?: Date
}

export default function Calendar({ selectedDate, onChange, minDate, maxDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [calendarDays, setCalendarDays] = useState<Array<{ date: Date | null; isCurrentMonth: boolean }>>([])

  // Initialize with current month if no date is selected
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    } else {
      setCurrentMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
    }
  }, [])

  // Generate calendar days whenever the current month changes
  useEffect(() => {
    generateCalendarDays()
  }, [currentMonth])

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1)
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfMonth.getDay()

    // Total days in the month
    const daysInMonth = lastDayOfMonth.getDate()

    // Generate array of days
    const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = []

    // Add days from previous month to fill the first week
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -firstDayOfWeek + i + 1)
      days.push({ date: prevMonthDay, isCurrentMonth: false })
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true })
    }

    // Add days from next month to fill the last week
    const remainingDays = 42 - days.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i)
      days.push({ date: nextMonthDay, isCurrentMonth: false })
    }

    setCalendarDays(days)
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true

    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
      return true
    }

    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
      return true
    }

    return false
  }

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false

    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isToday = (date: Date | null) => {
    if (!date) return false

    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const handleDateClick = (date: Date | null) => {
    if (!date || isDateDisabled(date)) return
    onChange(date)
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  return (
    <div className="p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <button onClick={goToPreviousMonth} className="p-1 rounded-full hover:bg-gray-100" aria-label="Previous month">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-medium">{formatMonth(currentMonth)}</h3>
        <button onClick={goToNextMonth} className="p-1 rounded-full hover:bg-gray-100" aria-label="Next month">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day.date)}
            disabled={isDateDisabled(day.date)}
            className={`
              h-9 w-9 flex items-center justify-center rounded-full text-sm
              ${!day.isCurrentMonth ? "text-gray-300" : ""}
              ${isDateDisabled(day.date) ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}
              ${isDateSelected(day.date) ? "bg-rose-600 text-white hover:bg-rose-700" : ""}
              ${isToday(day.date) && !isDateSelected(day.date) ? "border border-rose-600" : ""}
            `}
          >
            {day.date?.getDate()}
          </button>
        ))}
      </div>
    </div>
  )
}

