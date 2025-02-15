import React from "react";
import Cards from "../components/Useraccount/edituser/Cards";
import {
  CiBellOn,
  CiDesktop,
  CiLocationOn,
  CiLock,
  CiMoneyBill,
  CiUser,
} from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";

const card = [
  {
    icon: CiUser,
    title: "Personal info",
    descripion: "Provide the personal details and how we can reach you",
    toThe: "edit-user",
  },
  {
    icon: CiLocationOn,
    title: "Personal address",
    descripion: "personal address, so we can find best hotel for you",
    toThe: "personal-address",
  },
  {
    icon: CiLock,
    title: "Login & security",
    descripion: "Update your password and secure your account",
    toThe: "/edit-user",
  },
  {
    icon: CiDesktop,
    title: "Dashboard",
    descripion: "check your earnig and your hotel bookings",
    toThe: "/edit-user",
  },
  {
    icon: CiMoneyBill,
    title: "payment and payout",
    descripion: "Review payment,payout giftcard etc",
    toThe: "/edit-user",
  },
  {
    icon: CiBellOn,
    title: "Notification",
    descripion: "Choose Notification,how you want to connected",
    toThe: "/edit-user",
  },
];

function Account() {
  return (
    <div className="h-screen w-screen flex  justify-center">
      <div className=" w-[1200px]  p-15 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Your Account</h1>
        <p>edit & view your details</p>
        <div className="cards mt-20 flex flex-wrap  gap-6 justify-start w-full ">
          {card.map((c, index) => (
            <Cards
              key={index}
              icon={c.icon}
              title={c.title}
              description={c.descripion}
              toThe={c.toThe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
