function Profit() {
  return (
    <>
      <section className="flex w-full md:flex-row flex-col md:gap-4 gap-8 justify-evenly py-12 px-10">
        <div className="w-full md:w-1/2">
          <article className="flex flex-col gap-4 h-full w-full rounded-lg border-1 border-gray-400 bg-white p-6">
            <div className="inline-flex gap-2 self-end rounded-sm bg-green-100 p-1 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span className="text-xs font-medium"> 67.81% </span>
            </div>

            <div>
              <strong className="block text-sm font-medium text-gray-500">
                Profit
              </strong>

              <p>
                <span className="text-2xl font-medium text-gray-900">
                  $404.32
                </span>

                <span className="text-xs text-gray-500"> from $240.94 </span>
              </p>
            </div>
          </article>
        </div>
        <div className="w-full text-center  md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Maximize Your Profit
          </h2>

          <p className="mt-4 text-gray-700">
          Turn your property into a consistent income stream by listing it on our platform.
          Maximize your earnings by optimizing your pricing, increasing bookings, and offering exceptional service.
          </p>
        </div>
      </section>
    </>
  );
}

export default Profit;
