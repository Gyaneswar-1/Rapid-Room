import { FaHourglassHalf, FaCheckCircle, FaEnvelope } from "react-icons/fa";

function HostPendingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <FaHourglassHalf className="mx-auto text-yellow-500 text-6xl mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Under Review
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your host application is pending approval
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            Thank you for applying to become a host. Our team is currently
            reviewing your application. This process typically takes 1-3
            business days.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Application Progress
          </h2>
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div className="w-1/2 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-500 mb-1" />
                <span>Submitted</span>
              </div>
              <div className="flex flex-col items-center">
                <FaHourglassHalf className="text-yellow-500 mb-1" />
                <span>Under Review</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <FaCheckCircle className="text-gray-400 mb-1" />
                <span>Approved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            What happens next?
          </h2>
          <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
            <li>
              You'll receive an email notification once your application is
              approved.
            </li>
            <li>
              After approval, you'll be able to list your properties and start
              hosting.
            </li>
            <li>
              You may be contacted if additional information is needed for your
              application.
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <FaEnvelope className="text-blue-500 mr-3 text-xl" />
          <div>
            <p className="text-blue-700 font-medium">Have questions?</p>
            <p className="text-blue-600">
              Contact our support team at{" "}
              <a href="mailto:support@rapidroom.com" className="underline">
                support@rapidroom.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostPendingPage;
