
import Cards from "../components/Useraccount/edituser/Cards";
import {
  CiBellOn,
  CiDesktop,
  CiLocationOn,
  CiLock,
  CiMoneyBill,
  CiUser,
} from "react-icons/ci";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  return (
    <div className="h-screen w-screen flex md:pt-0 pt-12 justify-center">
      <div className=" md:w-[1200px] md:p-15 p-2 flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Your Account</h1>
        <p>edit & view your details</p>
        <span>switch to <a onClick={()=>{
          navigate("/user-profile")
        }} >user-profile</a></span>
        <div className="cards mt-20 flex flex-wrap  gap-6 md:justify-start justify-start w-full ">
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
