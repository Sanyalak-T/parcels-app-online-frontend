// import React from 'react'
// import { Link } from 'react-router'
// import Navbar from "../components/common/Navbar"

// const Organization = () => {
//   return (
//     <>
//     <Navbar />
//     <nav className="h-10 w-full bg-blue-400">
//       <div className='py-1 pl-4 '>
//         <Link to={"/create-organization"} className='text-white hover:text-black cursor-pointer'>New Organization</Link>
//       </div>
//     </nav>
//     </>
//   )
// }

// export default Organization

import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/common/Navbar';

const Organization = () => {
  return (
    <>
      <Navbar />

      {/* Action Bar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <h2 className="text-blue-700 font-semibold text-sm sm:text-base">
            Manage Organizations
          </h2>
          <Link
            to="/create-organization"
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            + New Organization
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Organization;
