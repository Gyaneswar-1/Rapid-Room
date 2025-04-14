import Navbar from "../components/Navbar/Navbar"
// import Footer from "../components/Navbar/Footer"
import { useState } from "react"

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("mission")

  // Company values
  const values = [
    {
      title: "Customer First",
      description: "We prioritize our customers' needs and satisfaction above all else.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "We continuously seek new ways to improve our service and technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical standards.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
  ]

  // Team members
  const teamMembers = [
    {
      name: "Bibek",
      role: "",
      image: "https://media.licdn.com/dms/image/v2/D4E35AQEBGVQMzfTbrQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1738214435919?e=1745211600&v=beta&t=ePU5qiEx-VoR32-BLglqRed6Ezkxwq7KYG1WNmt2Mi0",
      link:"https://www.linkedin.com/in/bibek-samal/"
    },
    {
      name: "Gyaneswar Rout",
      role: "",
      image: "https://gyaneswar.me/GyaneswarME.jpg",
      link:"https://gyaneswar.me"
    },
    {
      name: "Arpita Biswal",
      role: "",
      image: "/placeholder.svg?height=150&width=150",
      link:"https://www.instagram.com/p/CzDatyTSdZdeUlEfAP8CdoYeySB6n00O-V0hLk0/"
    },
    {
      name: "Emily Patel",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=150&width=150",
      link:""
    },
    {
      name: "Emily Patel",
      role: "UI/UX Designer",
      image: "/placeholder.svg?height=150&width=150",
      link:""
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar show={false}/>

      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About RapidRoom</h1>
            <p className="text-xl text-teal-100 mb-8">
              We're on a mission to revolutionize the way people book accommodations around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setActiveTab("mission")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeTab === "mission"
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("story")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "story"
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Our Story
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("vision")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeTab === "vision"
                      ? "bg-teal-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Our Vision
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              {activeTab === "mission" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-6">
                    At RapidRoom, our mission is to connect travelers with their perfect accommodations quickly and efficiently. We believe that finding a place to stay should be the easiest part of planning a trip, not the most stressful.
                  </p>
                  <p className="text-gray-600">
                    We're committed to providing a seamless booking experience with transparent pricing, verified listings, and exceptional customer service. Our goal is to make every stay memorable for the right reasons, allowing travelers to focus on what matters most – enjoying their journey.
                  </p>
                </div>
              )}

              {activeTab === "story" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
                  <p className="text-gray-600 mb-6">
                    RapidRoom was founded in 2018 by a group of passionate travelers who were frustrated with the complexity and hidden fees of existing booking platforms. What started as a small project has grown into a trusted platform used by thousands of travelers worldwide.
                  </p>
                  <p className="text-gray-600">
                    Our journey began with a simple idea: make hotel booking straightforward and transparent. Over the years, we've expanded our offerings while staying true to our core values of simplicity, honesty, and customer satisfaction.
                  </p>
                </div>
              )}

              {activeTab === "vision" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                  <p className="text-gray-600 mb-6">
                    We envision a world where booking accommodations is effortless and stress-free for everyone. Our vision is to become the most trusted and user-friendly booking platform globally, known for our reliability, transparency, and exceptional service.
                  </p>
                  <p className="text-gray-600">
                    Looking ahead, we're committed to continuous innovation, expanding our network of quality accommodations, and enhancing our technology to provide an even better experience for our users.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              These core principles guide everything we do at RapidRoom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{value.icon}</div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate people behind RapidRoom who work tirelessly to make your travel experience exceptional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <a 
                key={index} 
                className="text-center" 
                href={member.link ? (member.link.startsWith('http') ? member.link : `https://${member.link}`) : "#"} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience the RapidRoom Difference?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who choose RapidRoom for their accommodation needs.
          </p>
          <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-teal-50 transition duration-300">
            Book Your Stay Now
          </button>
        </div>
      </div>
    </div>
  )
}
