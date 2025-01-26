import { ModeToggle } from "./ThemaChanger";
import { NavLink } from "react-router-dom";
const NavBar2 = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-[#232D3F] sticky   top-0 z-50 shadow-zink-900 dark:shadow-none shadow-xl ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse ">
          <img
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-travel-logo-airplane-design-airplane-tickets-travel-agencies-png-image_5221805.jpg"
            className="h-16"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-blue-700 dark:text-white">
            TravelTrove
          </span>
        </NavLink>
        <div className="flex items-center md:order-2 gap-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <NavLink to="/signup"
            
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </NavLink>
          
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar2;
