import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFount";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  // endpoint from mock up API.
  // const endpoint = "https://67f9f0e3094de2fe6ea2b617.mockapi.io/products";

    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // get products from mock data
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch(endpoint);
        // if (!response.ok) {
        //   throw new Error("Failed to fetch data");
        // }
        // const data = await response.json();
              // console.log(data);
        // setProducts(data);
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