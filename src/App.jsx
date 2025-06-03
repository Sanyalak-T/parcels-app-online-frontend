import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Navigate, Link } from "react-router";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFount";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Organization from "./pages/Organization";
import Parcel from "./pages/Parcel";
import ParcelReport from "./pages/ParcelReport";

import { getProfile } from "./services/authService";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
      try {
        setLoading(true);
        const {user} = await getProfile();
        console.log(user);
        setUser(user);
        // console.log(userProfile);
        // const userName = user.userName;
        // console.log(userName);
        // setUser(userName);
        // console.log(user);
      } catch (error) {
        console.error("❌ Error fetching profile:", error.message);
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

    // if (error) {
    //   return (
    //     <div className="flex flex-col justify-center items-center">
    //       <h2 className="text-red-600">Something went wrong!</h2>
    //       <p className="text-red-600">Please contact support@support.com</p>
    //     </div>
    //   );
    // }

  //  return (
  //   <BrowserRouter>
  //     <Navbar user={user} />
  //     <Routes>
  //       {/* <Route
  //         path="/"
  //         element={
  //           <Login />
  //         }
  //       /> */}
  //        <Route
  //         path="/login"
  //         element={
  //           <Login />
  //         }
  //       />
  //       <Route
  //         path="/home"
  //         element={
  //           <ProtectedRoute user={user}>
  //             <Home />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/signup"
  //         element={<Signup />}
  //       />
  //       <Route
  //         path="/forgotpassword"
  //         element={<ForgotPassword />}
  //       />
  //       <Route
  //         path="/changepassword"
  //         element={<ChangePassword />}
  //       />
  //       <Route
  //         path="/organization"
  //         element={
  //           <ProtectedRoute user={user}>
  //             <Organization />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/parcel"
  //         element={
  //           <ProtectedRoute user={user}>
  //             <Parcel />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route
  //         path="/parcel-report"
  //         element={
  //           <ProtectedRoute user={user}>
  //             <ParcelReport />
  //           </ProtectedRoute>
  //         }
  //       />
  //       <Route path="*" element={<NotFound />} />
  //     </Routes>
  //   </BrowserRouter>
  //  )
    // router of app
     const router = createBrowserRouter([
      {
        path: "/", element: <Navbar user={user} setUser={setUser} />,
        children: [
          {path: "/", element: <Home />},
          {path: "login", element: <Login setUser={setUser} />},
          {path: "signup", element: <Signup />},
          {path: "forgotpassword", element: <ForgotPassword />},
          {path: "changepassword", element: <ChangePassword />},
          {path: "organization", element: <Organization />},
          {path: "parcel", element: <Parcel />},
          {path: "parcel-report", element: <ParcelReport />},
          {path: "*", element: <NotFound />},
        ]
      }
    ]);
    return <RouterProvider router={router} />
}