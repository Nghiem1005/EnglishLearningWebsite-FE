import { API } from "../api/baseUrl";

export const discountService = {
  getAllDiscount: async ({ size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/discount?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {}
  },
  getAllDiscountByDate: async ({ timeStart, timeEnd, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/discount/day?page=${page}&size=${size}&startDate=${timeStart}&endDate=${timeEnd}`
      );
      return response.data;
    } catch (error) {}
  },
  getDiscount: async ({ discountId }) => {
    try {
      const response = await API.get(
        `/api/v1/discount/${discountId}`
      );
      return response.data;
    } catch (error) {}
  },
  updateDiscount: async ({ discountId, data }) => {
    try {
      const response = await API.put(
        `/api/v1/discount?discountId=${discountId}`,
        data
      );
      return response.data;
    } catch (error) {}
  },
  createDiscount: async ({ data }) => {
    try {
      const response = await API.post(
        `/api/v1/discount`,
        data
      );
      return response.data;
    } catch (error) {}
  },
  createDiscountCourse: async ({ data }) => {
    try {
      const response = await API.post(
        `/api/v1/discount`,
        data
      );
      return response.data;
    } catch (error) {}
  },
  deleteDiscount: async ({ discountId }) => {
    try {
      const response = await API.delete(`/api/v1/discount?id=${discountId}`);
      return response.data;
    } catch (error) {}
  },
};
