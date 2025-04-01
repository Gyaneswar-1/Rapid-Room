import { useNavigate } from "react-router-dom";

function TermsSection() {
    const navigate = useNavigate();

  return (
    <div>
           <div className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Eligibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become a host, you must be at least 18 years old and have the legal right to list and manage a
                  property. You are responsible for ensuring your hotel complies with local laws and regulations.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Property Listing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Hosts must provide accurate details about their properties, including pricing, availability, and
                  amenities. Misleading or false information may result in listing removal. Additionally, hosts should
                  keep their listings up to date to avoid any confusion for potential guests...
                </p>
              </div>

              <button
                onClick={() => navigate("/admin-terms")}
                className="text-primary font-medium hover:text-primary transition-colors flex items-center gap-1"
              >
                Show more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TermsSection