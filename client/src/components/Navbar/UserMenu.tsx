// UserMenu.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

function UserMenu({ showRapidYourRoom }: { showRapidYourRoom: Boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = localStorage.getItem("loggedin")

  const controlSetIsOpen = () => {
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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 },
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        {localStorage.getItem("loggedin") ? (
          showRapidYourRoom ? (
            <div
              onClick={() => {
                {
                  navigate("/add-hotel");
                }
              }}
              className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer  "
            >
              Rapid Your Room
            </div>
          ) : null
        ) : (
          <p></p>
        )}

        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          onClick={controlSetIsOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          className="absolute rounded-xl  shadow-xl w-fit md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-20 " // Adjusted z-index
        >
          <div className="flex flex-col cursor-pointer ">
            {isLoggedIn ? (
              <>
                <MenuItem onClick={() => {}} label="Message" />
                <MenuItem onClick={() => {}} label="Trips" />
                <MenuItem onClick={() => {}} label="Wishlist" />
                <MenuItem onClick={() => {}} label="Manage Listing" />
                <MenuItem
                  onClick={() => navigate("/user-account")}
                  label="Account"
                />
                <MenuItem onClick={() => {}} label="Help Center" />
                <MenuItem
                  onClick={() => {}}
                  style="text-red-600"
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={() => {}} label="Signup" />
                <MenuItem onClick={() => {}} label="Login" />
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserMenu;
