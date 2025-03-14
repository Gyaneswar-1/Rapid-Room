import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="bg-white md:pt-12">
        <div className=" mx-4 sm:px-6 sm:py-5">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{
                x: -40,
              }}
              whileInView={{
                x: 0,
                y: 0,
              }}
              transition={{
                duration:0.6,
                delay:0.1
              }}
              viewport={{once:true}}
            >
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Became an Host ?
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                these are the benifits that you can get
              </p>
            </motion.div>

            <motion.div
             initial={{
              x: 40,
            }}
            whileInView={{
              x: 0,
              y: 0,
            }}
            transition={{
              duration:0.6,
              delay:0.1
            }}
            viewport={{once:true}}
            className="flex items-center gap-4">
              <button
                className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:ring-3 focus:outline-hidden"
                type="button"
              >
                <span
                  className="text-sm font-medium cursor-pointer"
                  onClick={() => {
                    navigate("/admin-terms");
                  }}
                >
                  {" "}
                  learn more{" "}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
