import { NavLink } from "react-router-dom";
import { CiHeart, CiMail, CiSearch, CiUser } from "react-icons/ci";
import { FaRegKissWinkHeart } from "react-icons/fa";

function BottomNav() {
  return (
    <div className="sm:hidden flex gap-4 fixed w-full h-fit bottom-0 bg-neutral-200 p-3">
      <div className="flex gap-2 justify-evenly w-full h-fit">
        <NavLink to="/home" className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-teal-600 fill-teal-600    underline font-extrabold" : "text-neutral-800"}`}>
          <CiSearch className="text-3xl" />
          <p className="text-xs">Explore</p>
        </NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-teal-600 fill-teal-600    underline font-extrabold " : "text-neutral-800"}`}>
          <CiHeart className="text-3xl" />
          <p className="text-xs">Wishlist</p>
        </NavLink>
        <NavLink to="/tips" className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-teal-600 fill-teal-600    underline font-extrabold " : "text-neutral-800"}`}>
          <FaRegKissWinkHeart className="text-3xl" />
          <p className="text-xs">Tips</p>
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-teal-600 fill-teal-600    underline font-extrabold " : "text-neutral-800"}`}>
          <CiMail className="text-3xl" />
          <p className="text-xs">Message</p>
        </NavLink>
        <NavLink to="/user-profile" className={({ isActive }) => `flex flex-col items-center ${isActive ? "text-teal-600 fill-teal-600    underline font-extrabold " : "text-neutral-800"}`}>
          <CiUser className="text-3xl" />
          <p className="text-xs">Profile</p>
        </NavLink>
      </div>
    </div>
  );
}

export default BottomNav;
