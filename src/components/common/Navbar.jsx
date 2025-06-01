import * as React from 'react';
import { Link, useNavigate } from 'react-router';
import { logoutUser } from '../../services/authService';

export default function SearchAppBar() {
    const navigate = useNavigate();
    //  navigate("/home");

    const handleLogout = async () => {
      navigate("/");
      await logoutUser();
      localStorage.removeItem("token");
    }
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
            <button onClick={handleLogout} className='p-2 cursor-pointer'>Logout</button>
            <Link to="/changepassword" className='p-2 cursor-pointer'>Change Password</Link>
          </div>
          <div className='flex flex-row items-center'>
            <span className='p-2 cursor-pointer'>Users</span>
          </div>
        </nav>
      </header>
    </>
  );
}
