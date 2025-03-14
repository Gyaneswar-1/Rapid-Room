import {motion} from "motion/react"
function Section1() {
  return (
    <div>
      <section>
        <div className="flex pt-10 md:px-10 items-center justify-center w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
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
            className="md:w-1/2">
              <img
                src="https://p4.wallpaperbetter.com/wallpaper/270/172/1004/4k-maldives-hotel-wallpaper-preview.jpg"
                className="rounded"
                alt=""
              />
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
            className="md:w-1/2">
              <div className="max-w-lg md:max-w-none text-center">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Why Host with Us?
                </h2>

                <p className="mt-4 text-gray-700">
                  Join our platform and unlock new opportunities. Earn money
                  effortlessly by listing your hotel, reaching thousands of
                  travelers, and maximizing your bookings.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section1;
