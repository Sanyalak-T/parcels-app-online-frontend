import { useState } from "react";
import { Link } from "react-router";
import '../utils/login.css';
import Navbar from "../components/common/Navbar"
// import '../utils/login.js';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewpassword, setConfirmNewPassword] = useState("");

  return (
    <>
    <Navbar />
    <div className="h-full flex items-center justify-center login">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <h2 className="font-bold text-gray-500 text-center py-2">
          confirm current password and setup new password
        </h2>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-900"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="currentPassword"
              className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            //   required
              autoFocus
              placeholder="Enter Current Password"
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="newPassword"
              className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            //   required
              placeholder="Enter New Password"
              minLength="5"
              maxLength="8"
            />
          </div>

          <div>
            <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-900"
            >
            Confirm New Password
            </label>
            <input
            id="confirmNewPassword"
            type="confirmNewPassword"
            className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
            value={confirmNewpassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            //   required
            autoFocus
            placeholder="Enter Email"
            />
          </div>

          <Link to="home"
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">Save!</div>
          </Link>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Back to Login Page!{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
