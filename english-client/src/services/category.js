import { API } from "../baseUrl";

export const getAllCategories = async ({ size, page }) => {
  try {
    const response = await API.get(
      `/api/v1/category?page=${page + 1}&size=${size}`
    );
    return response;
  } catch (error) {}
};

export const getCategory = async (categoryId) => {
  try {
    const response = await API.get(`/api/v1/category/${categoryId}`);
    return response;
  } catch (error) {}
};

export const createCategory = async (dataCategory) => {
  try {
    const response = await API.post(`/api/v1/category`, dataCategory);
    return response;
  } catch (error) {}
};

export const updateCategory = async (categoryId, updateCategory) => {
  try {
    const response = await API.put(
      `/api/v1/category?id=${categoryId}`,
      updateCategory
    );
    return response;
  } catch (error) {}
};

export const deleteCategory = async (categoryId) => {
  try {
    await API.delete(`/api/v1/category?id=${categoryId}`);
  } catch (error) {}
};
