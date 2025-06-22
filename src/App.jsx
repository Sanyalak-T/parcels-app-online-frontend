import React, {
  useState,
  useEffect,
} from "react";
import {
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFount";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Organization from "./pages/Organization";
import Parcel from "./pages/Parcel";
import ParcelReport from "./pages/ParcelReport";

import { AuthProvider } from "./context/AuthContext";
import { ParcelFilterProvider } from "./context/ParcelFilterContext";
import CreateOrganization from "./pages/CreateOrganization";
import CreateParcel from "./pages/CreateParcel";
import EditOrganization from "./pages/EditOrganization";
import Department from "./pages/Department";
import CreateDepartment from "./pages/CreateDepartment";
import EditDepartment from "./pages/EditDepartment";
import EditParcel from "./pages/EditParcel";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.error(
        "❌ Error fetching profile:",
        error.message
      );
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="italic text-center">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-red-600">
          Something went wrong!
        </h2>
        <p className="text-red-600">
          Please contact support@support.com
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ParcelFilterProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route
              path="/changepassword"
              element={<ChangePassword />}
            />
            <Route
              path="/organization"
              element={<Organization />}
            />
            <Route
              path="/create-organization"
              element={<CreateOrganization />}
            />
            <Route
              path="/edit-organization/:id"
              element={<EditOrganization />}
            />
            <Route
              path="/department"
              element={<Department />}
            />
            <Route
              path="/create-department"
              element={<CreateDepartment />}
            />
            <Route
              path="/edit-department/:id"
              element={<EditDepartment />}
            />
            <Route
              path="/parcel"
              element={<Parcel />}
            />
            <Route
              path="/create-parcel"
              element={<CreateParcel />}
            />
            <Route
              path="/edit-parcel/:id"
              element={<EditParcel />}
            />
            <Route
              path="/parcel-report"
              element={<ParcelReport />}
            />
            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </ParcelFilterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
