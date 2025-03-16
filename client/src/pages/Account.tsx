"use client"

import { useNavigate } from "react-router-dom"
import { CiBellOn, CiDesktop, CiLocationOn, CiLock, CiMoneyBill, CiUser } from "react-icons/ci"
import Cards from "../components/Useraccount/edituser/Cards"

const cards = [
  {
    icon: CiUser,
    title: "Personal info",
    description: "Provide the personal details and how we can reach you",
    toThe: "edit-user",
  },
  {
    icon: CiLocationOn,
    title: "Personal address",
    description: "Personal address, so we can find best hotel for you",
    toThe: "personal-address",
  },
  {
    icon: CiLock,
    title: "Login & security",
    description: "Update your password and secure your account",
    toThe: "/edit-user",
  },
  {
    icon: CiDesktop,
    title: "Dashboard",
    description: "Check your earnings and your hotel bookings",
    toThe: "/edit-user",
  },
  {
    icon: CiMoneyBill,
    title: "Payment and payout",
    description: "Review payment, payout, gift cards etc",
    toThe: "/edit-user",
  },
  {
    icon: CiBellOn,
    title: "Notification",
    description: "Choose notifications, how you want to be connected",
    toThe: "/edit-user",
  },
]

function Account() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Account</h1>
            <p className="text-gray-600 mb-2">Edit & view your details</p>
            <button
              onClick={() => navigate("/user-profile")}
              className="text-teal-600 hover:text-teal-800 font-medium transition-colors underline cursor-pointer"
            >
              Switch to user profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card, index) => (
              <Cards
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                toThe={card.toThe}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account

