import * as React from 'react';
import { Link } from 'react-router';

export default function SearchAppBar() {
    // const navigate = useNavigate();
    //  navigate("/home");
  return (
    <>
      <header className='h-20 w-auto bg-blue-500 font-bold text-white'>
        <nav className='h-20 w-auto flex flex-row justify-between p-2'>
          <div className='flex flex-row items-center'>
            <span>📦 Parcels App.</span>
          </div>
          <div className='flex flex-row items-center'>
            <span className='p-2 cursor-pointer'>Organization</span>
            <span className='p-2 cursor-pointer'>Parcels</span>
            <span className='p-2 cursor-pointer'>Users</span>
          </div>
          <div className='flex flex-row items-center'>
            <Link to="/" className='p-2 cursor-pointer'>Login</Link>
            <span className='p-2 cursor-pointer'>Logout</span>
            <span className='p-2 cursor-pointer'>Signup</span>
          </div>
        </nav>
      </header>
    </>
  );
}
