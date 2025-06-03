import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import '../utils/login.css';
import Navbar from "../components/common/Navbar"
import api from "../services/api";

const ChangePassword = () => {
  const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);
    const [showCurrentPasswordMismatch, setShowCurrentPasswordMismatch] =
    useState(false);

    useEffect(() => {
    const match = newPassword === confirmNewPassword && newPassword !== "";
    setIsPasswordMatch(match);
    setShowPasswordMismatch(
      newPassword !== "" && confirmNewPassword !== "" && !match
    );
  }, [newPassword, confirmNewPassword]);

    const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
    setShowCurrentPasswordMismatch(false);
  };

    const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

    const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

    const handleSaveChanges = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      // update password
      if (isPasswordMatch) {
        await api.post("/auth/users/update-password", {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        });
        // reset form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowPasswordMismatch(false);
        alert("Password updated successfully!");
        navigate("/home");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setShowCurrentPasswordMismatch(true);
      } else {
        console.error("Error updating password:", error);
        alert("An error occurred while updating the password.");
      }
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
    <div className="h-full flex items-center justify-center login">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <h2 className="font-bold text-gray-500 text-center py-2">
          confirm current password and setup new password
        </h2>

        {showPasswordMismatch && (<span className="text-red-400">New passwords do not match</span>)}

        {showCurrentPasswordMismatch && (<span className="text-red-400">Incorrect current password</span>)}

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
              onChange={handleCurrentPassword}
              // onChange={(e) => setCurrentPassword(e.target.value)}
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
              onChange={handleNewPasswordChange}
              // onChange={(e) => setNewPassword(e.target.value)}
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
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
            // onChange={(e) => setConfirmNewPassword(e.target.value)}
            //   required
            autoFocus
            placeholder="Enter Email"
            />
          </div>

          <button onClick={handleSaveChanges}
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">Save!</div>
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Back to Home Page!{" "}
          <Link to="/home" className="text-blue-600 hover:underline">
            home
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
