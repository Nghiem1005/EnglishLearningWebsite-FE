import { API } from "../api/baseUrl";
import axios from "axios";

export const billService = {
  createBill: async ({ studentId, courseId, data }) => {
    try {
      const response = await API.post(
        `/api/v1/bill?studentId=${studentId}&courseId=${courseId}`,
        data
      );
      return response;
    } catch (error) {
      return;
    }
  },
  paymentBillWithMoMo: async ({ data }) => {
    try {
      const response = await API.post(`/vn_pay`, data);
      return response;
    } catch (error) {
      return;
    }
  },

  getAllBillByUser: async ({ userId }) => {
    try {
      const response = await API.get(`/api/v1/bill/student/${userId}`);
      const resData = response.data.data.map((bill) =>
        API.get(`/api/v1/course/${bill.courseId}?userId=${userId}`)
      );
      const result = await axios.all(resData);
      const formatData  = result.reduce((acc, bill, index) => [
        ...acc,
        { ...response.data.data[index], course: {...bill.data.data}},
      ], []);
      return formatData;
    } catch (error) {}
  },
};

export const getAllBillsByStatus = async (statusBill) => {
  try {
    const response = await API.get(
      `/api/v1/delivery/status?status=${statusBill}`
    );
    if (response.data) {
      const promises = response.data.map((bill) =>
        API.get(`/api/v1/bill/${bill.billId}`)
      );
      const result = await axios.all(promises);
      const data = result.reduce(
        (acc, value, index) => [
          ...acc,
          {
            deliveryId: response.data[index].id,
            billId: value.data.billId,
            customer: value.data.userName,
            userId: value.data.userId,
            address: value.data.address,
            payDate: value.data.payDate,
            paymentMethod: value.data.paymentMethod,
            totalPrice: value.data.totalPrice,
            status: response.data[index].status,
            products: value.data.products,
            shipperPhone: response.data[index].shipperPhone,
            shipperName: response.data[index].shipperName,
          },
        ],
        []
      );
      return data;
    }
  } catch (error) {}
};

export const updateBillStatus = async (billId, updateData) => {
  try {
    const response = await API.put(`/api/v1/delivery?id=${billId}`, updateData);
    return response;
  } catch (error) {}
};

export const getBillTransaction = async () => {
  try {
    const response = await API.get(`/api/v1/bill/product/payed`);
    return response;
  } catch (error) {}
};
