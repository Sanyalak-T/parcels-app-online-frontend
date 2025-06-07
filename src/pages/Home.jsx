import React from "react";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router";
// import { Building, Package, FileText } from 'lucide-react';

function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card: Organization */}
          <Link
            to="/organization"
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:bg-blue-100 transition duration-200"
          >
            <span className="w-8 h-8 text-blue-500 mb-2 text-4xl">
              &#127973;
            </span>
            <h3 className="text-lg font-medium text-gray-800">
              Organization Records
            </h3>
          </Link>

          {/* Card: Department */}
          <Link
            to="/department"
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:bg-blue-100 transition duration-200"
          >
            <span className="w-8 h-8 text-blue-500 mb-2 text-4xl">
              &#127970;
            </span>
            <h3 className="text-lg font-medium text-gray-800">
              Department Records
            </h3>
          </Link>

          {/* Card: Parcels */}
          <Link
            to="/parcel"
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:bg-blue-100 transition duration-200"
          >
            <span className="w-8 h-8 text-blue-500 mb-2 text-4xl">
              &#128230;
            </span>
            <h3 className="text-lg font-medium text-gray-800">
              Parcels Records
            </h3>
          </Link>

          {/* Card: Reports */}
          <Link
            to="/parcel-report"
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center hover:bg-blue-100 transition duration-200"
          >
            <span className="w-8 h-8 text-blue-500 mb-2 text-4xl">
              &#128209;
            </span>
            <h3 className="text-lg font-medium text-gray-800">
              Parcels Report
            </h3>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
