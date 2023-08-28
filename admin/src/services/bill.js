import { API } from "../api/baseUrl";

export const billService = {
  getAllBillByCourse: async ({ courseId, option }) => {
    try {
      const response = await API.get(`/api/v1/bill/course/${courseId}`, option);
      return response;
    } catch (error) {}
  },
};



export const getProduct = async (productId) => {
  try {
    const response = await API.get(`/api/v1/product/${productId}`);
    return response;
  } catch (error) {}
};

export const createProduct = async (dataProduct) => {
  try {
    const response = await API.post(`/api/v1/product`, dataProduct);
    return response;
  } catch (error) {}
};

export const updateProduct = async (productId, updateProduct) => {
  try {
    const response = await API.put(
      `/api/v1/product?id=${productId}`,
      updateProduct
    );
    return response;
  } catch (error) {}
};

export const deleteProduct = async (productId) => {
  try {
    await API.delete(`/api/v1/product?id=${productId}`);
  } catch (error) {}
};

export const getSaleProduct = async (productId) => {
  try {
    const response = await API.get(
      `/api/v1/statistic/bill/product/sales/week/${productId}`
    );
    return response;
  } catch (error) {}
};
