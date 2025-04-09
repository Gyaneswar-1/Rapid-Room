import { Shield, Clock, CreditCard } from "lucide-react"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Navbar/Footer"

export default function WhyChooseUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar show={false}/>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Why Choose RapidRoom</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              We're committed to making your hotel booking experience seamless, affordable, and secure.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Instant Booking */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105">
              <div className="bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <Clock className="text-teal-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Instant Booking</h3>
              <p className="text-gray-600 text-center">
                Book your stay in seconds with our streamlined booking process. No waiting, no hassle - just instant
                confirmations.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Real-time availability updates
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Immediate confirmation emails
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  No booking fees
                </li>
              </ul>
            </div>

            {/* Best Price Guarantee */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105">
              <div className="bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <CreditCard className="text-teal-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600 text-center">
                We promise you'll get the best rates available. If you find a lower price elsewhere, we'll match it and
                give you an additional discount.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Price match guarantee
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Transparent pricing - no hidden fees
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Special member discounts
                </li>
              </ul>
            </div>

            {/* Trusted & Secure */}
            <div className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:scale-105">
              <div className="bg-teal-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <Shield className="text-teal-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">Trusted & Secure</h3>
              <p className="text-gray-600 text-center">
                Your security is our priority. We use industry-leading encryption to protect your personal and payment
                information.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Secure payment processing
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  Verified property listings
                </li>
                <li className="flex items-center">
                  <span className="bg-teal-100 rounded-full p-1 mr-2">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  24/7 customer support
                </li>
              </ul>
            </div>
          </div>
        </div>



        {/* CTA Section */}
        <div className="bg-teal-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the RapidRoom Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who choose RapidRoom for their accommodation needs.
            </p>
            <button className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-teal-100 transition duration-300">
              Book Your Stay Now
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
