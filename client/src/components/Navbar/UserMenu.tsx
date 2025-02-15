import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

function UserMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const controlSetIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
           onClick={()=>{
            navigate("/add-hotel")
        }}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer "
        >
          Rapid Your Room
        </div>
        <div
          onClick={controlSetIsOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rouned-xl shadow-xl w-[40vw] rounded-2xl border md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm z-12">
          <div className="flex flex-col cursor-pointer ">
            <>
              {true ? (
                <div>
                  <MenuItem onClick={() => {}} label="message" />
                  <MenuItem onClick={() => {}} label="tipes" />
                  <MenuItem onClick={() => {}} label="wishlist" />
                  <MenuItem onClick={() => {}} label="manage listing" />
                  <MenuItem
                    onClick={() => {
                      navigate("/user-account");
                    }}
                    label="Account"
                  />
                  <MenuItem onClick={() => {}} label="help center" />
                  <MenuItem
                    onClick={() => {
                      localStorage.setItem("isUserLoggedIn", "false");
                      window.location.reload()
                    }}
                    style={"text-red-600"}
                    label="logout"
                  />
                </div>
              ) : (
                <div>
                  <MenuItem onClick={() => {}} label="Signup" />
                  <MenuItem onClick={() => {}} label="Login" />
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
