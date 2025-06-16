import api from "./api";

// create a parcel
export const createParcel = async (
  parcelData
) => {
  const response = await api.post(
    "/add-parcel",
    parcelData
  );
  return response.data;
};

// get parcels
export const getParcels = async () => {
  const response = await api.get(
    "/get-all-parcel"
  );
  return response.data;
};

// get a parcel
export const getParcel = async (id) => {
  const response = await api.get(
    `/get-parcel/${id}`
  );
  return response.data;
};

// update a parcel
export const updateParcel = async (
  id,
  updateParcel
) => {
  const response = await api.put(
    `/edit-parcel/${id}`,
    updateParcel
  );
  return response.data;
};

// delete a parcel
export const deleteParcel = async (parcelId) => {
  const response = await api.delete(
    `/delete-parcel/${parcelId}`
  );
  return response.data;
};

// filter parcels
export const filterParcels = async (filters) => {
  const response = await api.get(
    "/filter-parcels",
    { params: filters }
  );
  console.log(response.data);
  return response.data;
};
