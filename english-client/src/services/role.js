import { API } from "../baseUrl";

export const getAllRoles = async ({ size, page }) => {
  try {
    const response = await API.get(
      `/api/v1/role?page=${page + 1}&size=${size}`
    );
    return response;
  } catch (error) {}
};

export const getRole = async (roleId) => {
  try {
    const response = await API.get(`/api/v1/role/${roleId}`);
    return response;
  } catch (error) {}
};

export const createRole = async (dataRole) => {
  try {
    const response = await API.post(`/api/v1/role`, dataRole);
    return response;
  } catch (error) {}
};

export const updateRole = async (roleId, updateRole) => {
  try {
    const response = await API.put(`/api/v1/role?id=${roleId}`, updateRole);
    return response;
  } catch (error) {}
};

export const deleteRole = async (roleId) => {
  try {
    await API.delete(`/api/v1/role?id=${roleId}`);
  } catch (error) {}
};
