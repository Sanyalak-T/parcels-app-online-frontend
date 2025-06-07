import { Link } from "react-router";
import UserDropdown from "../unique/userDropdown";

export default function Navbar() {
  return (
    <header className="bg-blue-600 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / App Name */}
        <div className="flex items-center space-x-2 text-white text-xl font-semibold">
          <span className="text-2xl">📝</span>
          <Link
            to="/home"
            className="hover:underline"
          >
            Parcels App
          </Link>
        </div>

        {/* Main Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-white text-sm font-medium">
          <Link
            to="/organization"
            className="hover:text-blue-200 transition-colors"
          >
            Organization
          </Link>
          <Link
            to="/department"
            className="hover:text-blue-200 transition-colors"
          >
            Department
          </Link>
          <Link
            to="/parcel"
            className="hover:text-blue-200 transition-colors"
          >
            Parcels
          </Link>
          <Link
            to="/parcel-report"
            className="hover:text-blue-200 transition-colors"
          >
            Parcels Report
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center">
          <UserDropdown />
        </div>
      </nav>
    </header>
  );
}
