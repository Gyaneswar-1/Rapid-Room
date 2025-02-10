import MainLogo from "../../assets/images/MainLogo.png"

const WelcomePagenavBar = ({toggleSignin, toggleSignup}:any) => {
  return (
    <div className="Navbar">
          <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  className="h-10 block"
                  src={MainLogo}
                  alt="Flowbite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap hidden md:block">
                  RapidRoom
                </span>
              </div>
              <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="cursor-pointer text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center"
                  onClick={() => {
                    toggleSignin();
                  }}
                >
                  Signin
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-teal-600  border-2 border-teal-600 hover:bg-teal-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-xl text-sm px-4 py-2 text-center "
                  onClick={() => {
                    toggleSignup();
                  }}
                >
                  Signup
                </button>
              </div>
            </div>
            <hr />
          </nav>
        </div>
  )
}

export default WelcomePagenavBar
