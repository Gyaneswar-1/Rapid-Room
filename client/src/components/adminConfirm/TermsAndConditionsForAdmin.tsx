import React from "react";

const TermsAndConditionsForAdmin: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Host Terms & Conditions</h1>
      
      <div className="space-y-6">
        {/* Section 1: Eligibility */}
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
          <p className="text-gray-700">
            To become a host, you must be at least 18 years old and have the legal right to
            list and manage a property. You are responsible for ensuring your hotel complies
            with local laws and regulations.
          </p>
        </section>

        {/* Section 2: Property Listing */}
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Property Listing</h2>
          <p className="text-gray-700">
            Hosts must provide accurate details about their properties, including pricing,
            availability, and amenities. Misleading or false information may result in listing
            removal. Additionally, hosts should keep their listings up to date to avoid any
            confusion for potential guests.
          </p>
        </section>

        {/* Section 3: Pricing & Payments */}
        <section>
          <h2 className="text-xl font-semibold mb-2">3. Pricing & Payments</h2>
          <p className="text-gray-700">
            Hosts set their own prices but must adhere to our payment processing terms.
            Payments will be released after guest check-in, subject to deductions for
            service fees. Any disputes regarding payments must be raised within 7 days
            of the transaction.
          </p>
        </section>

        {/* Section 4: Cancellation & Refunds */}
        <section>
          <h2 className="text-xl font-semibold mb-2">4. Cancellation & Refunds</h2>
          <p className="text-gray-700">
            Hosts must clearly define their cancellation policies. Refunds will be processed
            based on the selected cancellation terms and in accordance with our platform’s
            policy. Last-minute cancellations by hosts may lead to penalties, including
            temporary suspension of listing privileges.
          </p>
        </section>

        {/* Section 5: Host Responsibilities */}
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Host Responsibilities</h2>
          <p className="text-gray-700">
            Hosts must maintain a high standard of hospitality, provide clean and safe
            accommodations, and respond promptly to guest inquiries. Failure to do so may
            result in penalties or account suspension. Additionally, hosts should ensure
            that all amenities listed are functional and meet guest expectations.
          </p>
        </section>

        {/* Section 6: Legal Compliance */}
        <section>
          <h2 className="text-xl font-semibold mb-2">6. Legal Compliance</h2>
          <p className="text-gray-700">
            Hosts are solely responsible for ensuring their listings comply with local zoning
            laws, tax regulations, and licensing requirements. Failure to adhere to legal
            obligations may result in legal action or removal from our platform.
          </p>
        </section>

        {/* Section 7: Guest Conduct & Reviews */}
        <section>
          <h2 className="text-xl font-semibold mb-2">7. Guest Conduct & Reviews</h2>
          <p className="text-gray-700">
            Hosts should report any misconduct by guests to our support team. Guest reviews
            should be honest and reflect the actual experience. Hosts should also maintain
            professionalism when responding to reviews.
          </p>
        </section>

        {/* Section 8: Support & Dispute Resolution */}
        <section>
          <h2 className="text-xl font-semibold mb-2">8. Support & Dispute Resolution</h2>
          <p className="text-gray-700">
            In case of disputes, hosts should reach out to our support team for mediation.
            We aim to resolve conflicts fairly and efficiently.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsForAdmin;
