import Search from "./Search";
import UserMenu from "./UserMenu";
import MainLogo from "../../assets/images/MainLogo.png";
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";

interface display{
  show:boolean
}


function Navbar({show}:display) {
  const navigate = useNavigate();
  return (
    <div className=" fixed w-full bg-white z-11 shadow-sm ">
      <div className=" py-4 border-b border-b-gray-300 shadow-2xl">
        <div
          className="max-w-[2520px]
            mx-auto
             xl:px-20
            md:px-10
             sm:px-2
            px-4
            flex justify-between "
        >
          <div className=" flex  flex-row items-center justify-between gap-3 md:gap-1 cursor-pointer"
          onClick={()=>{navigate("/home")}}
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
          { show &&  <Search />}
          <UserMenu showRapidYourRoom={show}/>
        </div>
        { show &&  <Categories/>}
      </div>
    </div>
  );
}

export default Navbar;
