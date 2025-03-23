"use client";

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
  BsQuestionCircle,
  BsSignpostSplit,
  BsSuitcase2,
} from "react-icons/bs";

interface UserMenuProps {
  showRapidYourRoom: boolean;
}

import { userStoreType } from "../../store/reducers/user.reducers";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function UserMenu({ showRapidYourRoom }: UserMenuProps) {
  const { isHost, profileImage }: userStoreType = useSelector(
    (state: RootState) => state.userReducer
  );
  console.log("Profile",profileImage);
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

  console.log("the image", profileImage);
  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-3">
        {/* Host Button */}
        {showRapidYourRoom && (
          <div>
            {isHost ? (
              <button
                onClick={() => navigate("/hosting")}
                className="hidden cursor-pointer md:block text-sm font-medium py-2 px-4 rounded-full hover:bg-gray-100 transition"
              >
                Switch to Hosting
              </button>
            ) : (
              <button
                onClick={() => navigate("/admin-confirm")}
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
          <div className="hidden md:block">
            <img
              src={profileImage}
              alt="user profile"
              className="hidden md:block h-10 w-10 rounded-full object-center object-fill"
            />
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
                      navigate("/messages");
                      setIsOpen(false);
                    }}
                    label="Messages"
                    icons={BsChat}
                  />
                  <MenuItem
                    onClick={() => {
                      navigate("/my-bookings");
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
                      navigate("/user-account");
                      setIsOpen(false);
                    }}
                    label="Account"
                    icons={BsPerson}
                  />
                  <MenuItem
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    label="Help Center"
                    icons={BsQuestionCircle}
                  />
                  <MenuItem
                    onClick={() => {
                      // Handle logout
                      localStorage.removeItem("loggedin");
                      navigate("/");
                      setIsOpen(false);
                    }}
                    style="text-red-600"
                    label="Logout"
                    icons={BsBoxArrowRight}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      // Handle signup
                      setIsOpen(false);
                    }}
                    label="Sign up"
                    icons={BsBoxArrowInLeft}
                  />
                  <MenuItem
                    onClick={() => {
                      // Handle login
                      setIsOpen(false);
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
    </div>
  );
}

export default UserMenu;
