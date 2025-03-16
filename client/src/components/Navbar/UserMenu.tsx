// UserMenu.tsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
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

function UserMenu({ showRapidYourRoom }: { showRapidYourRoom: Boolean }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = localStorage.getItem("loggedin");

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
        {/*localStorage.getItem("loggedin")*/}
        {false ? (
          showRapidYourRoom ? (
            <div
              onClick={() => {
                false ? navigate("/add-hotel") : navigate("/admin-confirm");
              }}
              className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer  "
            >
              Rapid Your Room
            </div>
          ) : (
            <p className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full"></p>
          )
        ) : (
          <p className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full  hover:bg-neutral-100 transition cursor-pointer "
          onClick={()=>{
            navigate("/hosting")
          }}
          >switch to Hosting</p>
        )}

        <motion.div
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          onClick={controlSetIsOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 hidden md:flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
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
          <div className= " flex flex-col cursor-pointer my-2">
            {isLoggedIn ? (
              <>
                <MenuItem onClick={() => {}} label="Message" icons={BsChat} />
                <MenuItem
                  onClick={() => {}}
                  label="Trips"
                  icons={BsSuitcase2}
                />
                <MenuItem onClick={() => {}} label="Wishlist" icons={BsHeart} />
                <MenuItem
                  onClick={() => {}}
                  label="Manage Listing"
                  icons={BsListUl}
                />
                <MenuItem
                  onClick={() => navigate("/user-account")}
                  label="Account"
                  icons={BsPerson}
                />
                <MenuItem
                  onClick={() => {}}
                  label="Help Center"
                  icons={BsQuestionCircle}
                />
                <MenuItem
                  onClick={() => {}}
                  style="text-red-600"
                  label="Logout"
                  icons={BsBoxArrowRight}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {}}
                  label="Signup"
                  icons={BsBoxArrowInLeft}
                />
                <MenuItem
                  onClick={() => {}}
                  label="Login"
                  icons={BsSignpostSplit}
                />
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default UserMenu;
