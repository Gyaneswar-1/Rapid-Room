import {motion} from 'motion/react'

function Profit() {
  return (
    <div className="mb-24">
    <div className="flex flex-col md:flex-row items-center gap-12">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">Profit Potential</h3>
            <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-sm font-medium">67.81%</span>
            </div>
          </div>

          <div className="mb-6">
            <span className="block text-sm font-medium text-gray-500 mb-1">Average Monthly Profit</span>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">$404.32</span>
              <span className="ml-2 text-sm text-gray-500">from $240.94</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-medium text-gray-800 mb-2">Projected Annual Income</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Based on current trends</span>
              <span className="text-2xl font-bold text-teal-600">$4,851.84</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <div className="max-w-lg mx-auto md:mx-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Maximize Your Profit</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Turn your property into a consistent income stream by listing it on our platform. Maximize your
            earnings by optimizing your pricing, increasing bookings, and offering exceptional service.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Smart pricing recommendations</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Increased visibility to travelers</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Lower commission rates than competitors</span>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  </div>
  );
}

export default Profit;
