

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import SetUserDataToStore from "../service/userdata/SetDataToStore"

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState<string | null>("introduction")

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "definitions", title: "Definitions" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "booking-terms", title: "Booking Terms" },
    { id: "payment-policy", title: "Payment Policy" },
    { id: "cancellation-refunds", title: "Cancellation & Refunds" },
    { id: "privacy-policy", title: "Privacy Policy" },
    { id: "user-conduct", title: "User Conduct" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-800 to-teal-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-center max-w-3xl mx-auto"
          >
            Please read these terms and conditions carefully before using RapidRoom services
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-center mt-4 text-teal-100"
          >
            Last Updated: April 9, 2025
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Table of Contents */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      activeSection === section.id ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  to="/contact-us"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center"
                >
                  <span>Have questions? Contact us</span>
                  <ChevronDown className="ml-1 w-4 h-4 rotate-270" />
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Introduction</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    Welcome to RapidRoom. These Terms and Conditions govern your use of the RapidRoom website, mobile
                    applications, and services (collectively, the "Services"). By accessing or using our Services, you
                    agree to be bound by these Terms and Conditions.
                  </p>
                  <p className="mt-4">
                    RapidRoom provides an online platform that connects users with hotel accommodations and related
                    services. We act as an intermediary between users and accommodation providers. By using our
                    Services, you enter into a direct contractual relationship with the accommodation provider with
                    which you book.
                  </p>
                  <p className="mt-4">
                    If you do not agree with any part of these terms, you may not use our Services.
                  </p>
                </div>
              </section>

              {/* Definitions */}
              <section id="definitions" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Definitions</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>In these Terms and Conditions, the following definitions apply:</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>
                      <strong>"RapidRoom"</strong> refers to our company, website, mobile applications, and services.
                    </li>
                    <li>
                      <strong>"User"</strong> refers to any individual who accesses or uses our Services.
                    </li>
                    <li>
                      <strong>"Accommodation Provider"</strong> refers to hotels, resorts, or other lodging
                      establishments that list their properties on our platform.
                    </li>
                    <li>
                      <strong>"Booking"</strong> refers to a reservation made through our Services.
                    </li>
                    <li>
                      <strong>"Content"</strong> refers to all text, images, videos, reviews, and other materials that
                      appear on our Services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* User Accounts */}
              <section id="user-accounts" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">3. User Accounts</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    To use certain features of our Services, you may need to create a user account. When creating an
                    account, you agree to provide accurate, current, and complete information.
                  </p>
                  <p className="mt-4">
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account. You agree to notify us immediately of any unauthorized use
                    of your account.
                  </p>
                  <p className="mt-4">
                    We reserve the right to suspend or terminate your account if any information provided during the
                    registration process or thereafter proves to be inaccurate, false, or misleading, or if you fail to
                    comply with these Terms and Conditions.
                  </p>
                </div>
              </section>

              {/* Booking Terms */}
              <section id="booking-terms" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Booking Terms</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    When you make a booking through our Services, you are entering into a contract directly with the
                    accommodation provider. RapidRoom acts as an intermediary and is not a party to this contract.
                  </p>
                  <p className="mt-4">
                    By making a booking, you agree to the specific terms and conditions of the accommodation provider,
                    including their policies regarding check-in/check-out times, pet policies, smoking policies, and
                    other rules.
                  </p>
                  <p className="mt-4">
                    You are responsible for reviewing all details of your booking before confirming it, including dates,
                    room type, price, and the accommodation provider's policies.
                  </p>
                  <p className="mt-4">
                    Accommodation providers are responsible for the accuracy of their listings, including descriptions,
                    amenities, and availability. While we strive to ensure the accuracy of information on our platform,
                    we cannot guarantee that all information is accurate, complete, or current.
                  </p>
                </div>
              </section>

              {/* Payment Policy */}
              <section id="payment-policy" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Payment Policy</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    Payment methods accepted by RapidRoom include credit cards, debit cards, and other payment methods
                    as specified on our platform. By providing payment information, you represent and warrant that you
                    are authorized to use the designated payment method.
                  </p>
                  <p className="mt-4">Depending on the accommodation provider's policies, you may be required to:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Pay in full at the time of booking</li>
                    <li>Pay a deposit at the time of booking with the balance due at check-in</li>
                    <li>
                      Provide payment details to secure the booking with payment collected by the accommodation provider
                    </li>
                  </ul>

                  <p className="mt-4">
                    <strong>Price Guarantee:</strong> The price shown for a booking is the final price, including all
                    applicable taxes and fees, unless otherwise stated. Additional charges may apply for optional
                    services or amenities requested during your stay.
                  </p>

                  <p className="mt-4">
                    <strong>Currency:</strong> Prices may be displayed in different currencies for your convenience, but
                    the actual charge will be in the currency specified during the booking process.
                  </p>

                  <p className="mt-4">
                    <strong>Payment Security:</strong> We use industry-standard security measures to protect your
                    payment information. However, we cannot guarantee the security of information transmitted over the
                    internet.
                  </p>

                  <p className="mt-4">
                    <strong>Billing Errors:</strong> If you believe there has been a billing error, please contact our
                    customer service within 30 days of the charge. After 30 days, we reserve the right to deny a refund
                    request.
                  </p>
                </div>
              </section>

              {/* Cancellation & Refunds */}
              <section id="cancellation-refunds" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Cancellation & Refund Policies</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    Cancellation and refund policies vary by accommodation provider. The specific policies applicable to
                    your booking will be displayed before you confirm your reservation.
                  </p>
                  <p className="mt-4">Common cancellation policy types include:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>
                      <strong>Free Cancellation:</strong> Full refund if cancelled within the specified period
                    </li>
                    <li>
                      <strong>Partial Refund:</strong> Partial refund if cancelled within the specified period
                    </li>
                    <li>
                      <strong>Non-Refundable:</strong> No refund for cancellation
                    </li>
                  </ul>

                  <p className="mt-4">
                    To cancel a booking, you must follow the cancellation procedure specified in your booking
                    confirmation or on our platform.
                  </p>

                  <p className="mt-4">
                    <strong>Refund Processing:</strong> Refunds are processed according to the accommodation provider's
                    policy and may take 5-10 business days to appear in your account, depending on your payment method
                    and financial institution.
                  </p>

                  <p className="mt-4">
                    <strong>Modifications:</strong> Changes to existing bookings are subject to the accommodation
                    provider's policies and availability. Additional charges may apply.
                  </p>

                  <p className="mt-4">
                    <strong>Force Majeure:</strong> In the event of circumstances beyond our control (such as natural
                    disasters, acts of terrorism, or government actions), special cancellation terms may apply.
                  </p>
                </div>
              </section>

              {/* Privacy Policy */}
              <section id="privacy-policy" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">7. Privacy Policy</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    Our Privacy Policy describes how we collect, use, and share your personal information. By using our
                    Services, you consent to our collection and use of your information as described in our Privacy
                    Policy.
                  </p>
                  <p className="mt-4">
                    We collect personal information such as your name, email address, phone number, and payment
                    information to facilitate bookings and provide our Services.
                  </p>
                  <p className="mt-4">
                    We may share your information with accommodation providers to facilitate your booking. We may also
                    share your information with third-party service providers who assist us in operating our platform
                    and providing our Services.
                  </p>
                  <p className="mt-4">
                    We implement appropriate security measures to protect your personal information. However, no method
                    of transmission over the internet or electronic storage is 100% secure.
                  </p>
                  <p className="mt-4">
                    For more detailed information about our privacy practices, please refer to our full Privacy Policy.
                  </p>
                </div>
              </section>

              {/* User Conduct */}
              <section id="user-conduct" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">8. User Conduct</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>When using our Services, you agree not to:</p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe on the rights of others, including intellectual property rights</li>
                    <li>Submit false, misleading, or fraudulent information</li>
                    <li>Use our Services for any illegal or unauthorized purpose</li>
                    <li>Interfere with or disrupt our Services or servers</li>
                    <li>Attempt to gain unauthorized access to any part of our Services</li>
                    <li>Use our Services to transmit any viruses, malware, or other harmful code</li>
                    <li>Harass, threaten, or intimidate any other users</li>
                    <li>Post or transmit any content that is offensive, discriminatory, or inappropriate</li>
                  </ul>

                  <p className="mt-4">
                    We reserve the right to remove any content that violates these terms and to suspend or terminate the
                    accounts of users who violate these terms.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual-property" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">9. Intellectual Property</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    All content on our Services, including text, graphics, logos, icons, images, audio clips, digital
                    downloads, and software, is the property of RapidRoom or its content suppliers and is protected by
                    international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="mt-4">
                    You may not reproduce, modify, distribute, display, perform, or create derivative works from any
                    content on our Services without our express written permission.
                  </p>
                  <p className="mt-4">
                    The RapidRoom name, logo, and all related names, logos, product and service names, designs, and
                    slogans are trademarks of RapidRoom or its affiliates. You may not use these marks without our prior
                    written permission.
                  </p>
                  <p className="mt-4">
                    By submitting reviews, comments, or other content to our Services, you grant RapidRoom a
                    non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use,
                    reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display
                    such content throughout the world in any media.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">10. Limitation of Liability</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    To the maximum extent permitted by law, RapidRoom and its affiliates, officers, directors,
                    employees, and agents shall not be liable for any direct, indirect, incidental, special,
                    consequential, or punitive damages, including but not limited to, damages for loss of profits,
                    goodwill, use, data, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-2">
                    <li>Your use or inability to use our Services</li>
                    <li>
                      Any unauthorized access to or use of our servers and/or any personal information stored therein
                    </li>
                    <li>Any interruption or cessation of transmission to or from our Services</li>
                    <li>
                      Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services
                    </li>
                    <li>
                      Any errors or omissions in any content or for any loss or damage incurred as a result of the use
                      of any content posted, emailed, transmitted, or otherwise made available through our Services
                    </li>
                  </ul>

                  <p className="mt-4">
                    In no event shall our total liability to you for all damages, losses, or causes of action exceed the
                    amount paid by you, if any, for accessing or using our Services during the 12 months prior to
                    bringing the claim.
                  </p>

                  <p className="mt-4">
                    Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion
                    of liability for certain types of damages. Therefore, some of the above limitations may not apply to
                    you.
                  </p>
                </div>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">11. Governing Law</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of
                    [Jurisdiction], without regard to its conflict of law provisions.
                  </p>
                  <p className="mt-4">
                    Any dispute arising out of or relating to these Terms and Conditions or your use of our Services
                    shall be subject to the exclusive jurisdiction of the courts located within [Jurisdiction].
                  </p>
                  <p className="mt-4">
                    You agree to submit to the personal jurisdiction of the courts located within [Jurisdiction] for the
                    purpose of litigating all such claims.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section id="changes" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">12. Changes to Terms</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>
                    We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
                    immediately upon posting on our Services. Your continued use of our Services after any changes to
                    these Terms and Conditions constitutes your acceptance of the revised terms.
                  </p>
                  <p className="mt-4">
                    We will make reasonable efforts to notify you of significant changes to these Terms and Conditions,
                    such as by posting a notice on our Services or sending an email to the address associated with your
                    account.
                  </p>
                  <p className="mt-4">
                    It is your responsibility to review these Terms and Conditions periodically to stay informed of any
                    changes.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section id="contact" className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
                <div className="prose max-w-none text-gray-600">
                  <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <p>
                      <strong>RapidRoom Customer Support</strong>
                    </p>
                    <p>Email: support@rapidroom.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Booking Street, Suite 456, Hotel City, HC 78901</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Acceptance Banner */}
            <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-teal-800">
                    By using RapidRoom services, you agree to these terms
                  </h3>
                  <p className="text-teal-600 text-sm mt-1">Last updated: April 9, 2025</p>
                </div>
                <Link
                  to="/"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
       <SetUserDataToStore/>
    </div>
  )
}
