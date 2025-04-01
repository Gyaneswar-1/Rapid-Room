
const Footer = () => {
  return (
    <footer className="w-full bg-secondary ">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center ">
              © 2023{" "}
              <a href="#" className="hover:underline">
                RapidRoom™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex text-white flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
  )
}

export default Footer
