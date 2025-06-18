import React from "react";

const ParcelTable = ({ parcels }) => {
  if (!parcels.length)
    return <p>No results found.</p>;

  return (
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
                ).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
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
                {parcel.brandTypeModelSizeDescrip}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelTable;
