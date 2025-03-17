import { CiDesktop, CiMobile1, CiLaptop } from "react-icons/ci"

interface DeviceProps {
  device: {
    name: string
    location: string
    lastActive: string
    browser: string
    isCurrent: boolean
  }
}

export default function DeviceItem({ device }: DeviceProps) {
  const getDeviceIcon = () => {
    if (device.name.includes("iPhone") || device.name.includes("Android")) {
      return <CiMobile1 className="text-2xl" />
    } else if (device.name.includes("MacBook") || device.name.includes("Laptop")) {
      return <CiLaptop className="text-2xl" />
    } else {
      return <CiDesktop className="text-2xl" />
    }
  }

  return (
    <div className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="text-gray-600 mr-3">{getDeviceIcon()}</div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-800">
            {device.name}
            {device.isCurrent && (
              <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">Current Device</span>
            )}
          </h3>

          <button className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors">Sign Out</button>
        </div>

        <div className="text-sm text-gray-600 mt-1">
          <p>
            {device.browser} • {device.location}
          </p>
          <p className={device.isCurrent ? "text-green-600 font-medium" : ""}>{device.lastActive}</p>
        </div>
      </div>
    </div>
  )
}

