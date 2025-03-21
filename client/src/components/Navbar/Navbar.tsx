import Search from "./Search";
import UserMenu from "./UserMenu";
import MainLogo from "../../assets/images/MainLogo.png";
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";

interface display {
  show: boolean;
}

function Navbar({ show }: display) {
  const navigate = useNavigate();
  return (
    <div className=" fixed w-full bg-white z-11  ">
      <div className="pt-4">
        <div
          className="max-w-[2520px]
            mx-auto
             xl:px-20
            md:px-10
             sm:px-2
            px-4
            flex justify-between 
             pb-4"
        >
          <div
            className=" flex  flex-row items-center justify-between gap-3 md:gap-1 cursor-pointer"
            onClick={() => {
              navigate("/home");
            }}
          >
            <img
              className="rounded-full hidden md:block cursor-pointer"
              height={50}
              width={50}
              src={MainLogo}
              alt="Main Logo"
            />
            <p className="md:text-xl text-sm xl:block hidden">RapidRoom</p>
          </div>
          {show && <Search />}
          <UserMenu showRapidYourRoom={show} />
        </div>
        <div className="md:px-16">{show && <Categories />}</div>
      </div>
    </div>
  );
}

export default Navbar;
