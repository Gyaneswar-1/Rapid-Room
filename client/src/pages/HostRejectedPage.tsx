import { FaTimesCircle, FaEnvelope, FaRedo } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function HostRejectedPage() {
  return (
    <>
    <Navbar show={false}/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-12">
        <div className="text-center">
          <FaTimesCircle className="mx-auto text-red-500 text-6xl mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Application Not Approved
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your host application has been reviewed
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-red-700">
            We've carefully reviewed your application to become a host, but
            unfortunately, we're unable to approve it at this time.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Application Status
          </h2>
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div className="w-full shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <div className="flex flex-col items-center">
                <FaTimesCircle className="text-green-500 mb-1" />
                <span>Submitted</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTimesCircle className="text-green-500 mb-1" />
                <span>Reviewed</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTimesCircle className="text-red-500 mb-1" />
                <span>Not Approved</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Common reasons for non-approval:
          </h2>
          <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
            <li>Incomplete profile information or property details</li>
            <li>Property does not meet our quality or safety standards</li>
            <li>Verification issues with submitted documents</li>
            <li>Violation of our terms of service or community guidelines</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Link
            to="/host-confirm"
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <FaRedo className="mr-2" />
            Reapply as Host
          </Link>

          <a
            href="mailto:support@rapidroom.com"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <FaEnvelope className="mr-2" />
            Contact Support
          </a>
        </div>

        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="text-teal-700 font-medium">
            Want to know more about our decision?
          </p>
          <p className="text-teal-600">
            Our team is available to provide feedback on your application.
            Contact us at{" "}
            <a href="mailto:host-support@rapidroom.com" className="underline">
              host-support@rapidroom.com
            </a>{" "}
            for more information.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default HostRejectedPage;
