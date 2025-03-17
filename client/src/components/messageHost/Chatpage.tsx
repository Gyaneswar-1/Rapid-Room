"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Send, ArrowLeft } from "lucide-react"

// Mock data for host information
const hostData = {
  "1": {
    id: "1",
    name: "Oceanview Resort",
    avatar: "/placeholder.svg?height=40&width=40&text=OR",
    responseTime: "Usually responds within an hour",
  },
  "2": {
    id: "2",
    name: "Mountain Lodge",
    avatar: "/placeholder.svg?height=40&width=40&text=ML",
    responseTime: "Usually responds within a day",
  },
  "3": {
    id: "3",
    name: "City Center Hotel",
    avatar: "/placeholder.svg?height=40&width=40&text=CCH",
    responseTime: "Usually responds within 2 hours",
  },
  "4": {
    id: "4",
    name: "Beachfront Villas",
    avatar: "/placeholder.svg?height=40&width=40&text=BV",
    responseTime: "Usually responds within 3 hours",
  },
  "5": {
    id: "5",
    name: "Luxury Suites",
    avatar: "/placeholder.svg?height=40&width=40&text=LS",
    responseTime: "Usually responds within 30 minutes",
  },
}

// Initial messages for each host
// const initialMessages = {
//   "1": [
//     {
//       id: "1-1",
//       content: "Hello! How can I help you with your booking at Oceanview Resort?",
//       role: "host" as "host",
//       timestamp: new Date(Date.now() - 3600000), // 1 hour ago
//     },
//   ],
//   "2": [
//     {
//       id: "2-1",
//       content: "Welcome to Mountain Lodge! How may I assist you today?",
//       role: "host",
//       timestamp: new Date(Date.now() - 7200000), // 2 hours ago
//     },
//   ],
//   "3": [
//     {
//       id: "3-1",
//       content: "Thank you for choosing City Center Hotel. How can I help you?",
//       role: "host",
//       timestamp: new Date(Date.now() - 10800000), // 3 hours ago
//     },
//   ],
//   "4": [
//     {
//       id: "4-1",
//       content: "Welcome to Beachfront Villas! Is there anything specific you'd like to know about your upcoming stay?",
//       role: "host",
//       timestamp: new Date(Date.now() - 14400000), // 4 hours ago
//     },
//   ],
//   "5": [
//     {
//       id: "5-1",
//       content: "Thank you for booking with Luxury Suites. How may I assist you with your reservation?",
//       role: "host",
//       timestamp: new Date(Date.now() - 18000000), // 5 hours ago
//     },
//   ],
// }

interface Message {
  id: string
  content: string
  role: "user" | "host"
  timestamp: Date
}


export default function ChatPage() {
  const { hostId } = useParams<{ hostId: string }>()
  const navigate = useNavigate()
  const host = hostData[hostId as keyof typeof hostData]

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Redirect if host not found
  useEffect(() => {
    if (!host) {
        navigate("/messages")
    }
  }, [host, navigate])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `${hostId}-${Date.now()}`,
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate host typing
    setIsTyping(true)

    // Simulate host response after a delay
    setTimeout(() => {
      const hostMessage: Message = {
        id: `${hostId}-${Date.now() + 1}`,
        content: getHostResponse(input, hostId!),
        role: "host",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, hostMessage])
      setIsTyping(false)
    }, 1500)

    // Clear input
    setInput("")
  }

  // Simple function to generate host responses based on user input
  const getHostResponse = (userInput: string, hostId: string): string => {
    const input = userInput.toLowerCase()
console.log(hostId);

    if (input.includes("check-in") || input.includes("checkin") || input.includes("arrival")) {
      return "Check-in time is at 3:00 PM. Early check-in may be available upon request, subject to availability."
    } else if (input.includes("check-out") || input.includes("checkout") || input.includes("departure")) {
      return "Check-out time is at 11:00 AM. Late check-out may be arranged depending on availability."
    } else if (input.includes("breakfast") || input.includes("meal") || input.includes("food")) {
      return "Breakfast is served from 7:00 AM to 10:00 AM in the main dining area. We offer continental and full breakfast options."
    } else if (input.includes("wifi") || input.includes("internet")) {
      return "We provide complimentary high-speed WiFi throughout the property. The network name and password will be provided at check-in."
    } else if (input.includes("parking")) {
      return "We offer free parking for all our guests in our secure parking lot."
    } else if (input.includes("cancel") || input.includes("cancellation")) {
      return "Our cancellation policy allows free cancellation up to 48 hours before check-in. Please refer to your booking confirmation for specific details."
    } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return `Hello! How can I assist you with your stay at ${host.name}?`
    } else {
      return `Thank you for your message. I'll get back to you as soon as possible. Is there anything specific about your booking at ${host.name} you'd like to know?`
    }
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!host) return null

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate("/messages")}
            className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-150"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center">
            <img src={host.avatar || "/placeholder.svg"} alt={host.name} className="h-10 w-10 rounded-full mr-3" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{host.name}</h1>
              <p className="text-sm text-gray-500">{host.responseTime}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col h-[calc(100vh-10rem)]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-end ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <img
                    src={message.role === "user" ? "/placeholder.svg?height=32&width=32&text=You" : host.avatar}
                    alt={message.role === "user" ? "You" : host.name}
                    className={`h-8 w-8 rounded-full ${message.role === "user" ? "ml-2" : "mr-2"}`}
                  />
                  <div
                    className={`max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end">
                  <img src={host.avatar || "/placeholder.svg"} alt={host.name} className="h-8 w-8 rounded-full mr-2" />
                  <div className="max-w-md px-4 py-2 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

