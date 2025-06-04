import React from 'react'
import { Link } from 'react-router'
import Navbar from "../components/common/Navbar"

const CreateParcel = () => {
  return (
    <>
    <Navbar />
   {/* Secondary Navbar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-medium">
            <p>Creating New Percel</p>
          </div>
          <Link
            to="/parcel"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Percel List
          </Link>
        </div>
      </nav>

    <div className='flex flex-row justify-center'>
        <form className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Parcel Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">
                    Arrival Date
                </label>
                <input
                    type="date"
                    name="arrivalDate"
                    id="arrivalDate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                </div>

                <div>
                <label htmlFor="numberOrCode" className="block text-sm font-medium text-gray-700">
                    Number or Code
                </label>
                <input
                    type="text"
                    name="numberOrCode"
                    id="numberOrCode"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., A-001"
                />
                </div>

                <div>
                <label htmlFor="parcelType" className="block text-sm font-medium text-gray-700">
                    Parcel Type
                </label>
                <select
                    type="select"
                    name="parcelType"
                    id="parcelType"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Material type"
                >
                    <option value="material type">Material Type</option>
                    <option value="equipment type">Equipment Type</option>
                </select>
                </div>

                <div>
                <label htmlFor="parcelName" className="block text-sm font-medium text-gray-700">
                    Parcel Name
                </label>
                <input
                    type="text"
                    name="parcelName"
                    id="parcelName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Computer Name"
                />
                </div>

                <div>
                <label htmlFor="brandTypeModelSizeDescrip" className="block text-sm font-medium text-gray-700">
                    Brand, Tpye...
                </label>
                <input
                    type="text"
                    name="brandTypeModelSizeDescrip"
                    id="brandTypeModelSizeDescrip"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Lenovo"
                />
                </div>

                <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                    Unit Price (฿)
                </label>
                <input
                    type="text"
                    name="unitPrice"
                    id="unitPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., 15000"
                />
                </div>

                <div>
                <label htmlFor="howToGet" className="block text-sm font-medium text-gray-700">
                    How to Get
                </label>
                <input
                    type="text"
                    name="howToGet"
                    id="howToGet"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Money Support 2024"
                />
                </div>

                <div>
                <label htmlFor="parcelRemark" className="block text-sm font-medium text-gray-700">
                    Remark
                </label>
                <input
                    type="text"
                    name="parcelRemark"
                    id="parcelRemark"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Optional notes"
                />
                </div>
            </div>

            <div className="pt-4">
                <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                Save
                </button>
            </div>
        </form>
    </div>
    </>
  )
}

export default CreateParcel;