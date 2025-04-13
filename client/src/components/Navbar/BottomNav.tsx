import { NavLink } from "react-router-dom"
import { CiHeart, CiMail, CiSearch, CiUser } from "react-icons/ci"
import { FaRegKissWinkHeart } from "react-icons/fa"

function BottomNav() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full py-1 px-2 rounded-lg transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <CiSearch className="text-2xl" />
          <span className="text-xs mt-1">Explore</span>
        </NavLink>

        <NavLink
          to="/profile/wishlist"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full py-1 px-2 rounded-lg transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <CiHeart className="text-2xl" />
          <span className="text-xs mt-1">Wishlist</span>
        </NavLink>

        <NavLink
          to="/tips"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full py-1 px-2 rounded-lg transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <FaRegKissWinkHeart className="text-2xl" />
          <span className="text-xs mt-1">Tips</span>
        </NavLink>

        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full py-1 px-2 rounded-lg transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <CiMail className="text-2xl" />
          <span className="text-xs mt-1">Messages</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center w-full py-1 px-2 rounded-lg transition-colors ${
              isActive ? "text-primary font-medium" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`
          }
        >
          <CiUser className="text-2xl" />
          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </div>
  )
}

export default BottomNav

