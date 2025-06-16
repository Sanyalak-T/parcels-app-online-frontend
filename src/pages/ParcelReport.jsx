import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router";
import Navbar from "../components/common/Navbar";
import { filterParcels } from "../services/parcelService";
import ParcelFilterForm from "../components/filterform/parcelFilterForm";
import ParcelTable from "../components/filterform/parcelTable";

const ParcelReport = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchParcels = async (filters) => {
    setLoading(true);
    try {
      const results = await filterParcels(
        filters
      );
      console.log(results);
      setParcels(results.parcels);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <>
      <Navbar />
      {/* Action Bar */}
      <nav className="bg-blue-100 border-b border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <h2 className="text-blue-700 font-semibold text-sm sm:text-base">
            Manage Parcel Report
          </h2>
          <Link
            to="/create-parcel"
            className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 transition-colors"
          >
            + Parcel Report
          </Link>
        </div>
      </nav>

      <div className="p-4 space-y-4">
        <ParcelFilterForm
          onFilter={fetchParcels}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ParcelTable parcels={parcels} />
        )}
      </div>
    </>
  );
};

export default ParcelReport;
