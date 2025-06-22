import {
  createContext,
  useState,
  useContext,
} from "react";

// Create the context
const ParcelFilterContext = createContext();

// Create a provider component that will wrap your application or a part of it
export const ParcelFilterProvider = ({
  children,
}) => {
  const [filterCriteria, setFilterCriteria] =
    useState({
      parcelType: "",
      parcelName: "",
    });

  // This function will be exposed to update the filter criteria
  const updateFilter = ({
    parcelType,
    parcelName,
  }) => {
    setFilterCriteria({ parcelType, parcelName });
  };

  return (
    <ParcelFilterContext.Provider
      value={{ filterCriteria, updateFilter }}
    >
      {children}
    </ParcelFilterContext.Provider>
  );
};

// Create a custom hook to easily consume the context
export const useParcelFilter = () => {
  const context = useContext(ParcelFilterContext);
  if (context === undefined) {
    throw new Error(
      "useParcelFilter must be used within a ParcelFilterProvider"
    );
  }
  return context;
};
