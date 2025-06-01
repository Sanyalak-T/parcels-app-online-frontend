import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFount";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        setLoading(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    if (loading) {
      return <div className="italic text-center">Loading data...</div>;
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-red-600">Something went wrong!</h2>
          <p className="text-red-600">Please contact support@support.com</p>
        </div>
      );
    }

    // router of app
    const router = createBrowserRouter([
      {
        children: [
          {path: "/", element: <Login />},
          {path: "/home", element: <Home />},
          {path: "/signup", element: <Signup />},
          {path: "/forgotpassword", element: <ForgotPassword />},
          {path: "/changepassword", element: <ChangePassword />},
          {path: "*", element: <NotFound />},
        ]
      }
    ]);

  return <RouterProvider router={router} />;
}