import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const UserDropdown = () => {
    const { user, setUser } = useAuth();
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); //ใช้ ref เพื่อระบุพื้นที่ dropdown

    const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    };

    //ปิด dropdown เมื่อคลิกนอก
    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-left"
    >
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="px-4 py-2 font-medium text-white">
        Hello, {user?.userName || "User"}
      </button>

      {toggle && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-blue-100 shadow-lg text-[12px]">
          <div className="py-1 text-black">
            <Link
              to="/changepassword"
              className="block px-4 py-1 hover:text-blue-500 transition duration-200"
            >
              Change Password
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-1 cursor-pointer hover:text-blue-500 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown