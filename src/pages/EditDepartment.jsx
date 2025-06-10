import React, {
  useState,
  useEffect,
} from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router";
import Navbar from "../components/common/Navbar";
import {
  getDepartment,
  updateDepartment,
} from "../services/departmentService";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    departmentName: "",
    departmentRemark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const data = await getDepartment(id); // Fetch the department by ID
        const department = data.department;
        setFormData(department); //setup data from api
      } catch (err) {
        console.error(
          "Failed to fetch department",
          err
        );
        setError(
          "Failed to load department details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await updateDepartment(id, formData);
      navigate("/department");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Update organization failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );

  return (
    <>
      <Navbar />
      {/* Secondary Navbar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-medium">
            <p>Editing Department</p>
          </div>
          <Link
            to="/department"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Department List
          </Link>
        </div>
      </nav>

      <div className="flex flex-row justify-center">
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleEditDepartment}
          className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Department
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-700"
              >
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                id="departmentName"
                value={formData.departmentName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="orgRemark"
                className="block text-sm font-medium text-gray-700"
              >
                Department Remark
              </label>
              <input
                type="text"
                name="departmentRemark"
                id="departmentRemark"
                value={formData.departmentRemark}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Optional notes"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {/* {loading ? "Saving..." : "Save"} */}
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditDepartment;
