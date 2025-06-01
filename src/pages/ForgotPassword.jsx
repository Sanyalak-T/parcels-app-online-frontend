import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import '../utils/login.css';
import { resetPassword } from "../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    if (email) {
      navigate("/forgotpassword");
    }
  }, [email, navigate]);

  const handlePasswordChange = (event) => {
  setNewPassword(event.target.value);
  if (confirmNewPassword !== "" && event.target.value !== confirmNewPassword) {
    setPasswordMatchError("Passwords do not match");
  } else {
    setPasswordMatchError("");
  }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
    if (event.target.value !== newPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setPasswordMatchError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPassword({ email, newPassword });
      console.log(response.message);
      navigate("/home");
    } catch (err) {
       "Failed to reset password.", err;

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen login">
      <div className="background" id="background"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center">Parcels App. 📝</h1>
        <h2 className="font-bold text-gray-500 text-center py-2">
          confirm email, setup new password
        </h2>

        {passwordMatchError != "" && (<span className="text-red-400">{passwordMatchError}</span>)}

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            //   required
              autoFocus
              placeholder="Enter Email"
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
              onChange={handlePasswordChange}
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
            onChange={handleConfirmPasswordChange}
            // onChange={(e) => setConfirmNewPassword(e.target.value)}
            //   required
            autoFocus
            placeholder="Enter Email"
            />
          </div>

          <button onClick={handleSubmit}
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">{
                isLoading ? "Resetting..." : "Reset your password"
            }
            </div>
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Back to Login Page!{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
