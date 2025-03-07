import { IoCloudOfflineOutline } from "react-icons/io5";

function OfflinePage() {
  return (
    <div>
      <section className="py-24 relative bg-neutral-800 w-screen h-screen">
        <div className="w-full flex-col justify-start items-center gap-2.5 flex">
          <h2 className="text-center text-gray-100 text-3xl font-bold font-manrope leading-normal">
            Please bear with us! We're currently Offline.
          </h2>
          <p className="text-center text-gray-100 text-base font-normal leading-relaxed">
            check your internet connection or wifi connection. We'll be back
            online in.
          </p>
        </div>
        <div className="text-9xl text-rose-300 pt-32 animate-bounce w-full items-center justify-center flex">
          <IoCloudOfflineOutline   />
        </div>
      </section>
    </div>
  );
}

export default OfflinePage;
