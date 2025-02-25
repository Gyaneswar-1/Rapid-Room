import { IoCloudOfflineOutline } from "react-icons/io5";

function OfflinePage() {
  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-center items-center lg:gap-14 gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-center gap-5 flex">
              <div className="w-full flex-col justify-center items-center gap-6 flex">
                <div className="w-full flex-col justify-start items-center gap-2.5 flex">
                  <h2 className="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                    Please bear with us! We're currently Offline.
                  </h2>
                  <p className="text-center text-gray-500 text-base font-normal leading-relaxed">
                    check your internet connection or wifi connection. We'll be back
                    online in.
                  </p>
                </div>
              </div>
               <div className="text-9xl text-blue-600 pt-32 animate-bounce">
               <IoCloudOfflineOutline />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OfflinePage;
