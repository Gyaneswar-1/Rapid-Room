

import { useNavigate } from "react-router-dom"
import MainLogo from "../../assets/images/MainLogo.png"
import Search from "./Search"
import UserMenu from "./UserMenu"
import Categories from "./Categories"


interface NavbarProps {
  show: boolean
}

function Navbar({ show }: NavbarProps) {

  const navigate = useNavigate()
  return (
    <div className="fixed w-full bg-white z-50">
      <div className="py-2 ">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-4">
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <div
              className="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
              onClick={() => navigate("/home")}
            >
              <img
                className="rounded-full hidden md:block h-10 w-10 object-contain"
                src={MainLogo || "/placeholder.svg"}
                alt="RapidRoom"
              />
              <span className="font-bold text-teal-600 text-xl hidden sm:block">RapidRoom</span>
            </div>

            {/* Search Bar */}
            {show && <Search />}

            {/* User Menu */}
            <UserMenu showRapidYourRoom={show} />
          </div>
        </div>
      </div>

      {show && (
        <div className="px-2 md:px-10 lg:px-20">
          <Categories />
        </div>
      )}
    </div>
  )
}

export default Navbar

