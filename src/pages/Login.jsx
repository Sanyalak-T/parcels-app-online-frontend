import { useState } from "react";
import { useNavigate, Link } from "react-router";
import '../utils/login.css';
import { loginUser, getProfile} from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  // bg blure
  const blurValue = Math.max(0, 5 - password.length * 2);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const data = await loginUser({email, password});

    if (data.token) {
    localStorage.setItem("token", data.token);

    const profile = await getProfile(); // ดึงจาก authService
    setUser(profile.user); // ✅ Context จะ trigger render ทั่วแอป

    navigate("/");
  }

    navigate("/home"); // Redirect after successful login
  } catch (err) {
    console.error(err);
    setError(
      err?.response?.data?.message || "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen login">
      <div className="background" id="background" style={{
        filter: `blur(${blurValue}px)`,
      }}></div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-700 text-center">Parcels App. 📝</h1>
        <h2 className="font-bold text-gray-500 text-center py-2">
          Login to Your Account
        </h2>

      {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
      )}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button type="submit" disabled={loading}
            className="w-[100%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            <div className="w-full bg-blue-600 hover:bg-blue-700 text-center text-white font-semibold py-2 rounded-md transition duration-300">Login!</div>
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-4">
          Forget password?{" "}
          <Link to="/forgotpassword" className="text-blue-600 hover:underline">
            Forget password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
