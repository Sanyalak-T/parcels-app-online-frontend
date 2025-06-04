import React from 'react'
import { Link } from 'react-router'
import Navbar from "../components/common/Navbar"

const CreateOrganization = () => {
  return (
    <>
    <Navbar />
   {/* Secondary Navbar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-700 text-sm font-medium">
            <p>Creating New Organization</p>
          </div>
          <Link
            to="/organization"
            className="text-blue-600 hover:underline text-sm"
          >
            &larr; Back to Organization List
          </Link>
        </div>
      </nav>

    <div className='flex flex-row justify-center'>
        <form className="w-full max-w-3xl p-6 bg-white rounded-2xl shadow-md space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Organization Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label htmlFor="higherSection" className="block text-sm font-medium text-gray-700">
                        Higher Section
                    </label>
                    <input
                        type="text"
                        name="higherSection"
                        id="higherSection"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., Ministry of Health"
                    />
                    </div>

                    <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                        Organization Name
                    </label>
                    <input
                        type="text"
                        name="organizationName"
                        id="organizationName"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., Public Health Office"
                    />
                    </div>

                    <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <input
                        type="text"
                        name="department"
                        id="department"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="e.g., HR Department"
                    />
                    </div>

                    <div>
                    <label htmlFor="orgRemark" className="block text-sm font-medium text-gray-700">
                        Organization Remark
                    </label>
                    <input
                        type="text"
                        name="orgRemark"
                        id="orgRemark"
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

export default CreateOrganization