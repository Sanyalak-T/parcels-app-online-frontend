import { useState } from "react";
import { Link, useNavigate } from "react-router";
import '../utils/login.css';
import { signupUser } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try{
    const data = await signupUser({userName, email, password});
    console.log(data);
    navigate("/");
  } catch(err) {
    console.error(err);
    setError(
      err?.response?.data?.message || "Register failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen login">
      <div className="background" id="background"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center">Parcels App. 📝</h1>
        <h2 className="font-bold text-gray-500 text-center py-2">
          create user name, email and password
        </h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

        <form className="space-y-4">
          <div>
            <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-900"
            >
            User Name
            </label>
            <input
            id="userName"
            type="userName"
            className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            //   required
            autoFocus
            placeholder="Enter Email"
            />
          </div>
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
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full p-2 border border-black rounded-md focus:outline outline-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            //   required
              placeholder="Enter Password"
              minLength="5"
              maxLength="8"
            />
          </div>

          <button onClick={handleSubmit} disabled={loading}
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">Signup!</div>
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

export default Signup;
