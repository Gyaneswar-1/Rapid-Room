const MyBookingsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="text-center mb-12">
        <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
        <div className="h-6 w-96 bg-gray-200 rounded mx-auto"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>

                <div className="h-6 w-32 bg-gray-200 rounded"></div>

                <div className="flex gap-3">
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                  <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsSkeleton;
