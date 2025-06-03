import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router';
import { logoutUser } from '../../services/authService';

export default function Navbar({user, setUser}) {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // const {usershow} = user;
    console.log(user);
    const hideHeaderOn = ["/login"];
    const showHeader = !hideHeaderOn.includes(location.pathname) && !location.pathname.startsWith("/changepassword/");

      useEffect(() => {
      }, [user, loading]);

    const handleLogout = async () => {
      setLoading(true);
      await logoutUser();
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }

  return (
    <>
      {showHeader && (<header className='h-20 w-auto bg-blue-500 font-bold text-white'>
        <nav className='h-20 w-auto flex flex-row justify-between p-2'>
          <div className='flex flex-row items-center'>
            <Link to={"/home"}>📝 Parcels App.</Link>
          </div>
          <div className='flex flex-row items-center'>
            <Link to={"/organization"} className='p-2 cursor-pointer'>Organization</Link>
            <Link to={"/parcel"} className='p-2 cursor-pointer'>Parcels</Link>
            <Link to={"/parcel-report"} className='p-2 cursor-pointer'>Parcels Report</Link>
            <button onClick={handleLogout} className='p-2 cursor-pointer'>Logout</button>
            <Link to="/changepassword" className='p-2 cursor-pointer'>Change Password</Link>
          </div>
          <div className='flex flex-row items-center'>
            <span className='p-2 cursor-pointer'>Hello, {user?.userName || "Admin"}</span>
          </div>
        </nav>
      </header>)}
      <Outlet />
    </>
  );
}
