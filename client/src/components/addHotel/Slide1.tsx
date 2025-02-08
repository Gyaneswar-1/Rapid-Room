function Slide1() {
  return (
    <div className=" xl:px-70 md:px-42 px-2 pt-12 pb-20 w-full flex flex-col justify-center">
      <div className="mb-6 ">
        <label
          htmlFor="large-input"
          className="block  text-2xl font-medium text-black "
        >
          Give title to You'r Hotel
        </label>
        <p className="mb-2 text-black opacity-60">
          short title work best -you can change it later
        </p>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-2xl text-black border border-neutral-700 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-black mt-2">12/24</p>
      </div>
      {/* description */}
      <div>
        <label
          htmlFor="description"
          className="block  text-2xl font-medium text-black "
        >
          Create your Description
        </label>
        <p className="mb-2 text-black opacity-60">
          share what makes your hotel special
        </p>

        <textarea
          id="description"
          className="mt-2 p-4 md:md:text-xl text-md w-full rounded-lg border-neutral-700 border align-top shadow-xs text-base bg-white"
          rows={4}
          placeholder="Enter any additional order notes..."
        ></textarea>
        <p className="text-sm text-black mt-2">12/24</p>
      </div>
      {/* Price and rooms belr */}
      <div className="flex w-full flex-wrap gap-9">
        <div className="grow ">
          <label
            htmlFor="description"
            className="block   text-2xl font-medium text-black "
          >
            Now set your price
          </label>
          <p className="mb-2 text-black opacity-60">can be changed ay time</p>

          <form className=" w-full">
            <div className="relative flex border border-black items-center max-w-full rounded-xl bg-white p-3 gap-1.5">
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-white   h-11  text-gray-900 text-md   block w-full px-2.5 border-0 outline-0"
                placeholder="₹"
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 "
            >
              Please select a 5 digit number from 0 to 9.
            </p>
          </form>
        </div>
        <div className="grow ">
          <label
            htmlFor="description"
            className="block  text-2xl font-medium text-black "
          >
            Define number of rooms
          </label>
          <p className="mb-2 text-black opacity-60">
            can be increased later on
          </p>

          <form className=" w-full">
            <div className="relative flex border border-black items-center max-w-full rounded-xl bg-white p-3 gap-1.5">
              <input
                type="text"
                id="quantity-input"
                data-input-counter
                aria-describedby="helper-text-explanation"
                className="bg-white   h-11  text-gray-900 text-md   block w-full px-2.5 border-0 outline-0"
                placeholder="₹"
                required
              />
              <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 "
            >
              Please select a 5 digit number from 0 to 9.
            </p>
          </form>
        </div>
      </div>
      {/* Basic about place */}
      <div className="basic-info flex flex-col flex-wrap w-full bg-white  items-center  border-2 mt-12  rounded-2xl">
        <div className=" border-b-2 w-full  flex justify-evenly  h-24 items-center grow">
          <div className="relative flex items-center md:justify-between justify-evenly md:w-1/2 w-full">
            <span className="   text-black md:text-xl text-md ">Guests</span>
            <div className="flex gap-3 items-center">
            <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <p>12</p>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className=" border-b-2 w-full  flex justify-evenly h-24 items-center grow">
          <div className="relative flex items-center md:justify-between justify-evenly md:w-1/2 w-full">

            <span className="  md:text-xl text-md   text-black">Bathrooms</span>
            <div className="flex gap-2 items-center">
            <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <p>12</p>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className=" border-b-2 w-full  flex justify-evenly h-24 items-center grow">
          <div className="relative flex items-center md:justify-between justify-evenly md:w-1/2 w-full">
            <span className="  md:text-xl text-md   text-black">Beds</span>
            <div className="flex gap-2 items-center">
            <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <p>12</p>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="  w-full  flex justify-evenly h-24 items-center grow">
          <div className="relative flex items-center md:justify-between justify-evenly md:w-1/2 w-full">
            <span className="  md:text-xl text-md   text-black">Bedrooms</span>
            <div className="flex gap-2 items-center">
            <button
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className=" bg-gray-100   w-12 hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
              <p>12</p>
              <button
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  w-12  hover:bg-gray-200 border border-gray-300 rounded-full p-3 h-11 flex items-center justify-center "
              >
                <svg
                  className="w-3 h-3 text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide1;
