import MainLogo from "../../../assets/images/MainLogo.png"
function Fotter() {
  return (
    <div>
      <footer className="bg-gray-200">
        <div className="mx-auto px-4 py-3 ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center items-center text-teal-600 sm:justify-start">
              <img src={MainLogo} alt="" className="h-[50px] w-[63px]"/>
              <h1 className="text-2xl font-bold">Rapid Room</h1>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Fotter;
