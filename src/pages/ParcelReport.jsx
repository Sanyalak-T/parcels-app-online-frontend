import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import { filterParcels } from "../services/parcelService";
import ParcelFilterForm from "../components/filterform/ParcelFilterForm";
import ParcelTable from "../components/filterform/ParcelTable";
import { useAuth } from "../context/AuthContext";
import useOrgInfo from "../utils/useOrgInfo";
import { useParcelFilter } from "../context/ParcelFilterContext";

// import { generateParcelsReport } from "../utils/pdfService";
import { generateParcelsReport } from "../utils/pdfThaiService";

const ParcelReport = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] =
    useState(false); //เพิ่ม state เพื่อตรวจว่ามีการค้นหาแล้วหรือยัง
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [filters, setFilters] = useState({});

  //get parcel name and parcel type to show on report
  const { filterCriteria } = useParcelFilter(); // Get the filter criteria from context
  const { parcelType, parcelName } =
    filterCriteria;

  // call custom hook to get orgainization infos
  const { orgName, higherSectionName } =
    useOrgInfo();

  // get user login to show on report
  const { user, setUser } = useAuth();

  const fetchParcels = async (
    filtersArg = filters,
    pageNum = 1
  ) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const results = await filterParcels(
        filtersArg,
        pageNum
      );
      setParcels(results.data);
      setPage(results.page);
      setPages(results.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setFilters({});
    setParcels([]);
    setHasSearched(false);
  };

  const handleGeneratePDF = () => {
    generateParcelsReport(
      parcels,
      user,
      orgName,
      higherSectionName,
      parcelType,
      parcelName
    );
  };

  return (
    <>
      <Navbar />
      {/* Action Bar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <h2 className="text-blue-700 font-semibold text-sm sm:text-base">
            Manage Parcel Report
          </h2>
          <button
            onClick={handleGeneratePDF}
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            &#8613; Parcel Report
          </button>
        </div>
      </nav>

      <div className="p-4 space-y-4">
        <ParcelFilterForm
          onFilter={fetchParcels}
          onClear={handleClearFilters}
        />

        {loading && <p>Loading...</p>}

        {!loading &&
          hasSearched &&
          parcels.length === 0 && (
            <p>No data found</p>
          )}

        {!loading && parcels.length > 0 && (
          <ParcelTable parcels={parcels} />
        )}

        {/* Pagination Controls */}
        {!loading && pages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                fetchParcels(filters, page - 1)
              }
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {pages}
            </span>
            <button
              onClick={() =>
                fetchParcels(filters, page + 1)
              }
              disabled={page === pages}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* {!loading && parcels.length > 0 && (
        <ExportPDFButton data={parcels} />
        )} */}
      </div>
    </>
  );
};

export default ParcelReport;
