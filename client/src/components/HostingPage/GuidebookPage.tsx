import {
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineVideoCamera,
  HiOutlineExternalLink,
} from "react-icons/hi"

export default function GuidebookPage() {
  const guides = [
    {
      id: "1",
      title: "Getting started with hosting",
      description: "Learn the basics of hosting and how to create your first listing.",
      icon: <HiOutlineBookOpen className="h-6 w-6" />,
      category: "Basics",
      timeToRead: "10 min read",
    },
    {
      id: "2",
      title: "Optimizing your listing",
      description: "Tips and tricks to make your listing stand out and attract more guests.",
      icon: <HiOutlineDocumentText className="h-6 w-6" />,
      category: "Marketing",
      timeToRead: "15 min read",
    },
    {
      id: "3",
      title: "Hosting responsibly",
      description: "Guidelines for being a responsible host and ensuring guest satisfaction.",
      icon: <HiOutlineQuestionMarkCircle className="h-6 w-6" />,
      category: "Best Practices",
      timeToRead: "12 min read",
    },
    {
      id: "4",
      title: "Managing your calendar",
      description: "Learn how to effectively manage your availability and bookings.",
      icon: <HiOutlineDocumentText className="h-6 w-6" />,
      category: "Management",
      timeToRead: "8 min read",
    },
  ]

  const videos = [
    {
      id: "1",
      title: "Hosting 101: The Complete Guide",
      thumbnail: "/placeholder.svg?height=150&width=300",
      duration: "45:12",
    },
    {
      id: "2",
      title: "Taking Great Photos of Your Space",
      thumbnail: "/placeholder.svg?height=150&width=300",
      duration: "12:34",
    },
    {
      id: "3",
      title: "Setting the Right Price",
      thumbnail: "/placeholder.svg?height=150&width=300",
      duration: "18:22",
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Host Guidebook</h1>

      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-xl font-bold text-white mb-2">Welcome to the Host Guidebook</h2>
            <p className="text-rose-100 mb-4">
              Find everything you need to know about hosting, from creating your listing to welcoming guests and
              managing your bookings.
            </p>
            <button className="px-4 py-2 bg-white text-primary text-sm font-medium rounded-md hover:bg-rose-50 transition-colors">
              Get started
            </button>
          </div>
          <div className="md:w-1/3">
            <img
              src="/placeholder.svg?height=200&width=300"
              alt="Host Guidebook"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular guides</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded-full bg-rose-100 text-primary w-fit mb-4">{guide.icon}</div>

              <h3 className="font-medium text-gray-900 mb-1">{guide.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{guide.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {guide.category}
                </span>
                <span className="text-xs text-gray-500">{guide.timeToRead}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Video tutorials</h2>

          <button className="text-sm text-primary font-medium flex items-center hover:text-rose-700">
            View all
            <HiOutlineExternalLink className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-3 bg-primary bg-opacity-90 rounded-full text-white">
                    <HiOutlineVideoCamera className="h-6 w-6" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Frequently asked questions</h2>

        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-2">How do I create a new listing?</h3>
            <p className="text-sm text-gray-600">
              To create a new listing, go to the Listings tab and click on "Create new listing". Follow the step-by-step
              guide to add details about your property, upload photos, set pricing, and publish your listing.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-2">How do I set my pricing?</h3>
            <p className="text-sm text-gray-600">
              You can set your base price when creating or editing your listing. Consider factors like location,
              amenities, seasonality, and local events when determining your price. You can also use our Smart Pricing
              tool for recommendations.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <h3 className="font-medium text-gray-900 mb-2">What should I do if a guest damages my property?</h3>
            <p className="text-sm text-gray-600">
              If a guest damages your property, document the damage with photos and report it within 14 days of the
              guest's checkout. You can request compensation through our Resolution Center.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">How do I get paid?</h3>
            <p className="text-sm text-gray-600">
              Payments are typically released 24 hours after your guest's scheduled check-in time. The time it takes for
              the money to appear in your account depends on your payout method, usually within 5-7 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

