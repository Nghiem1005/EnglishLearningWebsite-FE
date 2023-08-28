import { API } from "../baseUrl";

export const getAllDiscounts = async ({ size, page }) => {
  try {
    const response = await API.get(
      `/api/v1/discount?page=${page + 1}&size=${size}`
    );
    return response;
  } catch (error) {}
};

export const getDiscount = async (discountId) => {
  try {
    const response = await API.get(`/api/v1/discount/${discountId}`);
    return response;
  } catch (error) {}
};

export const createDiscount = async (dataDiscount) => {
  try {
    const response = await API.post(`/api/v1/discount`, dataDiscount);
    return response;
  } catch (error) {}
};

export const updateDiscount = async (discountId, updateDiscount) => {
  try {
    const response = await API.put(`/api/v1/discount?id=${discountId}`, updateDiscount);
    return response;
  } catch (error) {}
};

export const deleteDiscount = async (discountId) => {
  try {
    await API.delete(`/api/v1/discount?id=${discountId}`);
  } catch (error) {}
};
