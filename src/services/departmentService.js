import api from "./api";

// create a department
export const createDepartment = async (
  departmentData
) => {
  const response = await api.post(
    "/add-department",
    departmentData
  );
  return response.data;
};

// get departments
export const getDepartments = async () => {
  const response = await api.get(
    "/get-all-department"
  );
  return response.data;
};

// get a department
export const getDepartment = async (id) => {
  const response = await api.get(
    `/get-department/${id}`
  );
  return response.data;
};

// update a department
export const updateDepartment = async (
  id,
  updateDepartment
) => {
  const response = await api.put(
    `/edit-department/${id}`,
    updateDepartment
  );
  return response.data;
};

// delete a department
export const deleteDepartment = async (
  departmentId
) => {
  const response = await api.delete(
    `/delete-department/${departmentId}`
  );
  return response.data;
};
