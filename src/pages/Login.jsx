import { useState } from "react";
import { Link } from "react-router";
import '../utils/login.css';
// import '../utils/login.js';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // bg blure
  const blurValue = Math.max(0, 3 - password.length * 2);

  return (
    <div className="flex items-center justify-center min-h-screen login">
      <div className="background" id="background" style={{
        filter: `blur(${blurValue}px)`,
      }}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center">📦 Parcels App.</h1>
        <h2 className="font-bold text-gray-500 py-2">
          Login to Your Account
        </h2>

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

          <Link to="home"
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">Login!</div>
          </Link>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          Forget password?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Forget password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
