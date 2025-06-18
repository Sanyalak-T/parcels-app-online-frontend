import React from "react";
import { useState, useEffect } from "react";

const ParcelSearchForm = ({ onFilter }) => {
  const initialFilters = {
    parcelName: "",
  };
  const [filters, setFilters] = useState(
    initialFilters
  );
  const [error, setError] = useState(""); // สำหรับข้อความแจ้งเตือน

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ ตรวจสอบว่าผู้ใช้กรอกอย่างน้อย 1 ฟิลด์
    const hasInput = filters.parcelName;

    if (!hasInput) {
      setError("Please search parcel name");

      // ตั้งเวลา 3 วินาที ให้ข้อความหายไป
      setTimeout(() => {
        setError(""); // เคลียร์ข้อความถ้ามีการส่งใหม่
      }, 3000);

      return;
    }

    onFilter(filters);

    // ✅ รีเซ็ตฟอร์มหลังจากค้นหา
    setFilters(initialFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 mb-2"
    >
      <input
        type="text"
        name="parcelName"
        placeholder="Parcel Name"
        value={filters.parcelName}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      {/* ✅ แสดงข้อความแจ้งเตือนถ้ามี */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Search
      </button>
    </form>
  );
};

export default ParcelSearchForm;
