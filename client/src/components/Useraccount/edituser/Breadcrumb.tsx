import {Link} from "react-router-dom"
import { CiHome } from "react-icons/ci"

export default function Breadcrumb() {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link to="/" className="flex items-center hover:text-primary transition-colors">
        <CiHome className="mr-1" />
        Home
      </Link>
      <span className="mx-2">/</span>
      <Link to="/account" className="hover:text-primary transition-colors">
        Account
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-800 font-medium">Edit Personal Info</span>
    </nav>
  )
}

