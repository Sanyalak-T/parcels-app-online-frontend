import api from "./api";

// create a organization
export const createOrganization = async (organizationData) => {
  const response = await api.post("/auth/add-organization", organizationData);
  return response.data;
};

// get organizations
export const getOrganizations = async () => {
  const response = await api.get("/get-all-organization");
  return response.data;
};

// get a organization
export const getOrganization = async (id) => {
  const response = await api.get(`/get-organization/${id}`);
  return response.data;
};

// update a orgainzation
export const updateOrganization = async (id, updateOrganization) => {
  const response = await api.put(
    `/edit-organization/${id}`,
    updateOrganization
  );
  return response.data;
};

// delete a organization
export const deleteOrganization = async (organizationId) => {
  const response = await api.delete(`/delete-organization/${organizationId}`);
  return response.data;
};
