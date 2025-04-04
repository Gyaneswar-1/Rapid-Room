import { MarsIcon } from "lucide-react";

interface HostHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function HostHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}: HostHeaderProps) {


  


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 md:hidden p-4"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <MarsIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HostHeader;
