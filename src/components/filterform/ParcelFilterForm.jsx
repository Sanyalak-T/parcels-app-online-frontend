import React from "react";
import { useState } from "react";

const ParcelFilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    parcelName: "",
    parcelType: "",
    arrivalDate: "",
  });
  console.log("", filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <input
        type="text"
        name="parcelName"
        placeholder="Parcel Name"
        value={filters.parcelName}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        name="parcelType"
        placeholder="Parcel Type"
        value={filters.parcelType}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <input
        type="date"
        name="arrivalDate"
        value={filters.arrivalDate}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Search
      </button>
    </form>
  );
};

export default ParcelFilterForm;
