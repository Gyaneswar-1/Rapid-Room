// <div>explore whishList tipes msg profile</div>

import { useState } from "react";
import { CiHeart, CiMail, CiSearch, CiUser } from "react-icons/ci";
import { FaRegKissWinkHeart } from "react-icons/fa";

function BottomNav() {
  const [selected, setSelected] = useState<String | null>(null);

  const handleClick = (icon: string) => {
    setSelected(icon);
  };
  return (
    <div className="sm:hidden block fixed w-full h-fit bottom-0 bg-neutral-200 p-3">
      <div className=" flex gap-2 justify-evenly w-full h-fit">
        <div className="flex flex-col items-center ">
          <div className={`text-3xl  ${selected === "explore" ? "text-teal-600" :"text-neutral-800"}`} onClick={()=>{handleClick("explore")}}>
            <CiSearch />
          </div>
          <p className="text-xs text-neutral-800">Explore</p>
        </div>
        <div className="flex flex-col items-center ">
          <div className={`text-3xl ${selected === "wishlist" ? "text-teal-600" :"text-neutral-800"}`} onClick={()=>{handleClick("wishlist")}}>
            <CiHeart />
          </div>
          <p className="text-xs text-neutral-800">Wishlist</p>
        </div>
        <div className="flex flex-col items-center ">
          <div className={`text-3xl ${selected === "tips" ? "text-teal-600" :"text-neutral-800"}`} onClick={()=>{handleClick("tips")}}>
            <FaRegKissWinkHeart />
          </div>
          <p className="text-xs text-neutral-800">Tips</p>
        </div>
        <div className="flex flex-col items-center ">
          <div className={`text-3xl ${selected === "message" ? "text-teal-600" :"text-neutral-800"}`} onClick={()=>{handleClick("message")}}>
            <CiMail />
          </div>
          <p className="text-xs text-neutral-800">Message</p>
        </div>
        <div className="flex flex-col items-center ">
          <div className={`text-3xl ${selected === "profile" ? "text-teal-600" :"text-neutral-800"}`} onClick={()=>{handleClick("profile")}}>
            <CiUser />
          </div>
          <p className="text-xs text-neutral-800">Profile</p>
        </div>
      </div>
    </div>
  );
}

export default BottomNav;
