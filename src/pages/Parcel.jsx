import React, {
  useEffect,
  useState,
} from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import {
  getParcels,
  deleteParcel,
} from "../services/parcelService";
import ParcelSearchForm from "../components/filterform/ParcelSearchForm";

const Parcel = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] =
    useState(false); //เพิ่ม state เพื่อตรวจว่ามีการค้นหาแล้วหรือยัง
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({});

  const getData = async (
    filters = {},
    page = 1,
    limit = 20
  ) => {
    try {
      setLoading(true);
      const data = await getParcels({
        ...filters,
        page,
        limit,
      });
      setParcels(data.parcels);
      setPages(data.pagination.totalPages || 1);
      setPage(page);
    } catch (err) {
      console.error(err);
      setError("Failed to load parcels");
    } finally {
      setLoading(false);
    }
  };

  // 🟦 เพิ่มฟังก์ชัน search handler
  const handleSearch = (filters) => {
    setFilters(filters);
    setHasSearched(true);
    getData(filters, 1);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-parcel/${id}`);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this parcel?"
      )
    )
      return;
    try {
      await deleteParcel(id); // เรียก API ลบ
      // อัปเดตรายการใน state
      setParcels((prev) =>
        prev.filter((parcel) => parcel._id !== id)
      );
    } catch (err) {
      console.error("Delete parcelled", err);
      alert("Delete faile");
    }
  };

  return (
    <>
      <Navbar />
      {/* Action Bar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <h2 className="text-blue-700 font-semibold text-sm sm:text-base">
            Manage Parcels
          </h2>
          <Link
            to="/create-parcel"
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            + New Parcel
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4">
        {/* search part */}
        <ParcelSearchForm
          onFilter={handleSearch}
        />

        {loading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && parcels.length === 0 && (
          <p className="text-gray-500">
            No parcels found.
          </p>
        )}

        {!loading && parcels.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Arrival Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Number/Code
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Parcel Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Parcel Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Brand...
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    How To Get
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Parcel Remark
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {parcels.map((parcel, index) => (
                  <tr key={parcel._id || index}>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Date(
                        parcel.arrivalDate
                      ).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.numberOrCode}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.parcelType}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.parcelName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {
                        parcel.brandTypeModelSizeDescrip
                      }
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.unitPrice}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.howToGet}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {parcel.parcelRemark}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <div className="flex space-x-2">
                        {/* แก้ไข */}
                        <button
                          onClick={() =>
                            handleEdit(parcel._id)
                          }
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Edit
                        </button>

                        {/* ลบ */}
                        <button
                          onClick={() =>
                            handleDelete(
                              parcel._id
                            )
                          }
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-4 space-x-2">
          <button
            disabled={page === 1}
            onClick={() =>
              getData(filters, page - 1)
            }
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">
            {page} / {pages}
          </span>
          <button
            disabled={page === pages}
            onClick={() =>
              getData(filters, page + 1)
            }
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Parcel;
