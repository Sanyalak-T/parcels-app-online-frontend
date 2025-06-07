import React, {
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import {
  getOrganizations,
  deleteOrganization,
} from "../services/organizationService";

const Department = () => {
  const [organizations, setOrganizations] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getOrganizations();
        setOrganizations(data.organizations);
      } catch (err) {
        console.error(err);
        setError("Failed to load organizations.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleEdit = (id) => {
    // เปลี่ยนเส้นทางไปหน้า edit โดยใส่ id ใน URL
    navigate(`/edit-organization/${id}`);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this organization?"
      )
    )
      return;
    try {
      await deleteOrganization(id); // เรียก API ลบ
      // อัปเดตรายการใน state
      setOrganizations((prev) =>
        prev.filter((org) => org._id !== id)
      );
    } catch (err) {
      console.error("Delete failed", err);
      alert("Delete failed");
    }
  };

  return (
    <>
      <Navbar />

      {/* Action Bar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <h2 className="text-blue-700 font-semibold text-sm sm:text-base">
            Manage Departments
          </h2>
          <Link
            to="/create-organization"
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            + New Department
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        {loading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading &&
          organizations.length === 0 && (
            <p className="text-gray-500">
              No departments found.
            </p>
          )}

        {!loading && organizations.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Higher Section
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Organization Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Department Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Remark
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {organizations.map(
                  (org, index) => (
                    <tr key={org._id || index}>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {org.higherSection}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {org.organizationName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {org.departmentName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        {org.orgRemark}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800">
                        <div className="flex space-x-2">
                          {/* แก้ไข */}
                          <button
                            onClick={() =>
                              handleEdit(org._id)
                            }
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Edit
                          </button>

                          {/* ลบ */}
                          <button
                            onClick={() =>
                              handleDelete(
                                org._id
                              )
                            }
                            className="text-red-600 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Department;
