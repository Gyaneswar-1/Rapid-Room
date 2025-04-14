import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import {
  BsBoxArrowInLeft,
  BsBoxArrowRight,
  BsChat,
  BsHeart,
  BsListUl,
  BsPerson,
  BsSignpostSplit,
  BsSuitcase2,
} from "react-icons/bs";

interface UserMenuProps {
  showRapidYourRoom: boolean;
}

import { userStoreType, resetUserData } from "../../store/reducers/user.reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { TfiDashboard } from "react-icons/tfi";
import SetUserDataToStore from "../../service/userdata/SetDataToStore";
import {
  flipSignin,
  flipSignUp,
} from "../../store/reducers/showAuthCard.reducers";
import Signin from "../UserAuth/Signin";
import Signup from "../UserAuth/Signup";
import { FaUserCircle } from "react-icons/fa";

function UserMenu({ showRapidYourRoom }: UserMenuProps) {
  const { isHost, profileImage, fullName }: userStoreType = useSelector(
    (state: RootState) => state.userReducer
  );

  const { showSignup, showSignin } = useSelector(
    (state: RootState) => state.showAuthCardReducer
  );

  console.log("Profile", profileImage, fullName,isHost);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = localStorage.getItem("loggedin");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    dispatch(resetUserData());
    navigate("/");
    location.reload();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <SetUserDataToStore />
      <div className="flex items-center gap-3">
        {showRapidYourRoom && (
          <div>
            {isHost ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden  cursor-pointer lg:block text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition"
              >
                Switch to Hosting
              </button>
            ) : (
              <button
                onClick={() => navigate("/host-confirm")}
                className="hidden cursor-pointer md:block text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition"
              >
                rapid your Room
              </button>
            )}
          </div>
        )}

        {/* User Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center cursor-pointer gap-2 p-1.5 border border-gray-200 rounded-full hover:shadow-md transition"
        >
          <AiOutlineMenu className="text-gray-600" size={18} />
          <div className="hidden md:block h-10 w-10">
            {profileImage ? (
              <img
                src={profileImage}
                alt="user profile"
                className="hidden md:block h-full w-full rounded-full object-center object-cover"
              />
            ) : (
              <div className="">
                <FaUserCircle className="hidden md:block h-10 w-10 rounded-full object-center object-fill " />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <div className="py-2">
              {isLoggedIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/comeingsoon");
                      setIsOpen(false);
                    }}
                    label="Messages"
                    icons={BsChat}
                  />
                  <MenuItem
                    onClick={() => {
                      navigate("/bookings");
                      setIsOpen(false);
                    }}
                    label="My Bookings"
                    icons={BsSuitcase2}
                  />
                  <MenuItem
                    onClick={() => {
                      navigate("/wishlist");
                      setIsOpen(false);
                    }}
                    label="Wishlist"
                    icons={BsHeart}
                  />
                  <MenuItem
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    label="Manage Listings"
                    icons={BsListUl}
                  />

                  <div className="my-2 border-t border-gray-100"></div>

                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      setIsOpen(false);
                    }}
                    label="Account"
                    icons={BsPerson}
                  />
                  <MenuItem
                    onClick={() => {
                      navigate("/dashboard");
                      setIsOpen(false);
                    }}
                    label="Dashbord"
                    icons={TfiDashboard}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    style="text-red-600"
                    label="Logout"
                    icons={BsBoxArrowRight}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      dispatch(flipSignin(showSignin));
                    }}
                    label="Sign up"
                    icons={BsBoxArrowInLeft}
                  />
                  <MenuItem
                    onClick={() => {
                      dispatch(flipSignUp(showSignup));
                    }}
                    label="Log in"
                    icons={BsSignpostSplit}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showSignin && <Signin />}
      {showSignup && <Signup />}
    </div>
  );
}

export default UserMenu;
