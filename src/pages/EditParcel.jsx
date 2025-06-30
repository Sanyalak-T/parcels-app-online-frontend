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
  getParcel,
  updateParcel,
} from "../services/parcelService";

const EditParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // กำหนดรายการ Parcel Type ทั้งหมดที่เป็นไปได้
  // ควรจะตรงกับ enum ใน Mongoose Schema ของคุณ
  const ALL_PARCEL_TYPES = [
    "material type",
    "equipment type",
  ];

  const [formData, setFormData] = useState({
    arrivalDate: "",
    numberOrCode: "",
    parcelType: "",
    parcelName: "",
    brandTypeModelSizeDescrip: "",
    unitPrice: "",
    howToGet: "",
    parcelRemark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        setLoading(true);
        const data = await getParcel(id); // Fetch the department by ID
        const parcel = data.parcel;
        setFormData(parcel); //setup data from api

        // ตรวจสอบว่า parcelType เป็น Array หรือไม่
        // ใน Mongoose Schema คุณกำหนดเป็น `type: [String]` ซึ่งหมายถึง Array of Strings
        const currentParcelType = Array.isArray(
          parcel.parcelType
        )
          ? parcel.parcelType[0] || "" // เลือกค่าแรก ถ้ามี หรือเป็น String ว่าง
          : parcel.parcelType || ""; // ถ้าไม่ใช่ Array ให้ใช้ค่าที่ได้มาตรงๆ

        setFormData({
          ...parcel,
          arrivalDate: parcel.arrivalDate
            ? new Date(parcel.arrivalDate)
                .toISOString()
                .split("T")[0]
            : "", // ฟอร์แมตวันที่ให้ถูกต้องสำหรับ input type="date"
          parcelType: currentParcelType,
        });
      } catch (err) {
        console.error(
          "Failed to fetch parcel",
          err
        );
        setError(
          "Failed to load parcel details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParcel();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditParcel = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ในที่นี้จะสมมติว่าคุณจะส่งกลับไปเป็น Array ที่มีค่าเดียว เพื่อให้เข้ากับ Schema ปัจจุบัน
      const payloadToSend = {
        ...formData,
        parcelType: [formData.parcelType], // แปลงเป็น Array เพื่อให้ตรงกับ Mongoose Schema
      };

      await updateParcel(id, payloadToSend);
      navigate("/parcel");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Update parcel failed. Please try again."
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
            <p>Editing Parcel</p>
          </div>
          <Link
            to="/parcel"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Parcel List
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
          onSubmit={handleEditParcel}
          className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Parcel
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="arrivalDate"
                className="block text-sm font-medium text-gray-700"
              >
                Arrival Date
              </label>
              <input
                type="text"
                name="arrivalDate"
                id="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="numberOrCode"
                className="block text-sm font-medium text-gray-700"
              >
                Number/Code
              </label>
              <input
                type="text"
                name="numberOrCode"
                id="numberOrCode"
                value={formData.numberOrCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="parcelType"
                className="block text-sm font-medium text-gray-700"
              >
                Parcel Type
              </label>
              <select
                name="parcelType"
                id="parcelType"
                value={formData.parcelType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">
                  -- Select Type --
                </option>
                {ALL_PARCEL_TYPES.map(
                  (type, index) => (
                    <option
                      key={index}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="parcelName"
                className="block text-sm font-medium text-gray-700"
              >
                Parcel Name
              </label>
              <input
                type="text"
                name="parcelName"
                id="parcelName"
                value={formData.parcelName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="brandTypeModelSizeDescrip"
                className="block text-sm font-medium text-gray-700"
              >
                Brand...
              </label>
              <input
                type="text"
                name="brandTypeModelSizeDescrip"
                id="brandTypeModelSizeDescrip"
                value={
                  formData.brandTypeModelSizeDescrip
                }
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="unitPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Unit Price
              </label>
              <input
                type="text"
                name="unitPrice"
                id="unitPrice"
                value={formData.unitPrice}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="howToGet"
                className="block text-sm font-medium text-gray-700"
              >
                How To Get
              </label>
              <input
                type="text"
                name="howToGet"
                id="howToGet"
                value={formData.howToGet}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., HR Department"
              />
            </div>

            <div>
              <label
                htmlFor="parcelRemark"
                className="block text-sm font-medium text-gray-700"
              >
                Parcel Remark
              </label>
              <input
                type="text"
                name="parcelRemark"
                id="parcelRemark"
                value={formData.parcelRemark}
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
              {loading ? "Saving..." : "Save"}
              {/* Save */}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditParcel;
