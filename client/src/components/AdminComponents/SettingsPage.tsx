import AdminLayout from "./components/layout/AdminLayout"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500">Configure your admin dashboard settings.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">General Settings</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded-md" 
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notification Preferences
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

