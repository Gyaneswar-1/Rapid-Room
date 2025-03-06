
function Stat() {
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Trusted by Travelers Worldwide
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
          Rapid Room is the go-to platform for seamless booking and unforgettable experiences. Join millions of travelers who trust us for their adventures.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Total Bookings
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              8k
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Destinations
            </dt>

            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
              2400+
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-orange-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Customer Satisfaction
            </dt>

            <dd className="text-4xl font-extrabold text-orange-600 md:text-5xl">
              96%
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-gray-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Partnered Hotels
            </dt>

            <dd className="text-4xl font-extrabold text-gray-600 md:text-5xl">
              4000+
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Stat;
