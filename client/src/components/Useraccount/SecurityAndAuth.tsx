
import { useState } from "react"
// import Breadcrumb from "../components/Breadcrumb"
import { CiLock, CiMobile1, CiDesktop, CiClock2 } from "react-icons/ci"
import DeviceItem from "./loginSecurity/DeviceItem"
import ChangePasswordModal from "./loginSecurity/ChangePasswordModal"
import SecuritySection from "./loginSecurity/SecuritySection"

export default function SecurityAndAuth() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal)
  }

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
  }

  // Mock data for devices
  const devices = [
    {
      name: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Active now",
      browser: "Chrome",
      isCurrent: true,
    },
    {
      name: "iPhone 13",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      browser: "Safari Mobile",
      isCurrent: false,
    },
    {
      name: "Windows PC",
      location: "New York, NY",
      lastActive: "Yesterday at 3:45 PM",
      browser: "Firefox",
      isCurrent: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* <Breadcrumb currentPage="Login & Security" /> */}

        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-4">
          <div className="flex items-center mb-6">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <CiLock className="text-teal-600 text-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Login & Security</h1>
          </div>

          <p className="text-gray-600 mb-8">Manage your password and security settings to keep your account secure.</p>

          <div className="space-y-8">
            {/* Password Section */}
            <SecuritySection
              icon={<CiLock />}
              title="Password"
              description="Last updated 3 months ago"
              actionText="Change"
              onAction={togglePasswordModal}
            />

            {/* Two-Factor Authentication */}
            <SecuritySection
              icon={<CiDesktop />}
              title="Two-Factor Authentication"
              description={twoFactorEnabled ? "Enabled" : "Disabled"}
              isToggle={true}
              toggleValue={twoFactorEnabled}
              onToggle={toggleTwoFactor}
            />

            {/* Recovery Phone */}
            <SecuritySection
              icon={<CiMobile1 />}
              title="Recovery Phone"
              description="+1 (555) 123-4567"
              actionText="Edit"
              onAction={() => {}}
            />

            {/* Devices Section */}
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center mb-4">
                <CiDesktop className="text-teal-600 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Devices</h2>
              </div>

              <p className="text-gray-600 mb-4">These devices have logged into your account in the last 30 days.</p>

              <div className="space-y-4">
                {devices.map((device, index) => (
                  <DeviceItem key={index} device={device} />
                ))}
              </div>
            </div>

            {/* Login History */}
            <div className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center mb-4">
                <CiClock2 className="text-teal-600 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Login History</h2>
              </div>

              <p className="text-gray-600 mb-4">Recent login activity on your account.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-500 font-medium">Date & Time</th>
                      <th className="px-4 py-2 text-left text-gray-500 font-medium">Location</th>
                      <th className="px-4 py-2 text-left text-gray-500 font-medium">Device</th>
                      <th className="px-4 py-2 text-left text-gray-500 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-800">Today, 10:30 AM</td>
                      <td className="px-4 py-3 text-gray-800">San Francisco, CA</td>
                      <td className="px-4 py-3 text-gray-800">MacBook Pro (Chrome)</td>
                      <td className="px-4 py-3">
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                          Success
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-800">Yesterday, 8:45 PM</td>
                      <td className="px-4 py-3 text-gray-800">San Francisco, CA</td>
                      <td className="px-4 py-3 text-gray-800">iPhone 13 (Safari)</td>
                      <td className="px-4 py-3">
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                          Success
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-800">Mar 15, 2:30 PM</td>
                      <td className="px-4 py-3 text-gray-800">New York, NY</td>
                      <td className="px-4 py-3 text-gray-800">Windows PC (Firefox)</td>
                      <td className="px-4 py-3">
                        <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium">
                          Failed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && <ChangePasswordModal onClose={togglePasswordModal} />}
    </div>
  )
}

