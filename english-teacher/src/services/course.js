import { API } from "../api/baseUrl";
import axios from "axios";

export const courseService = {
  getAllCourse: async ({ teacherId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/course/teacher/${teacherId}?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
  addCourse: async ({ teacherId, dataCourse }) => {
    try {
      const response = await API.post(
        `/api/v1/course/${teacherId}`,
        dataCourse
      );
      return response;
    } catch (error) {}
  },
  updateCourse: async ({ courseId, updateData }) => {
    try {
      const response = await API.put(`/api/v1/course/${courseId}`, updateData);
      return response;
    } catch (error) {}
  },
  getCourse: async ({ courseId, userId }) => {
    try {
      const response = await API.get(`/api/v1/course/${courseId}&userId=${userId}`);
      return response;
    } catch (error) {}
  },
  deleteCourse: async ({ courseId }) => {
    try {
      const response = await API.delete(`api/v1/course/${courseId}`);
      return response;
    } catch (error) {}
  },
  
  getAllCourseType: async () => {
    try {
      const response = await API.get(`/api/v1/course/type`);
      return response.data;
    } catch (error) {}
  },
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

// if (response.data) {
//   const promises = response.data.map((bill) =>
//     API.get(`/api/v1/bill/${bill.billId}`)
//   );
//   const result = await axios.all(promises);
//   const data = result.reduce(
//     (acc, value, index) => [
//       ...acc,
//       {
//         deliveryId: response.data[index].id,
//         billId: value.data.billId,
//         customer: value.data.userName,
//         userId: value.data.userId,
//         address: value.data.address,
//         payDate: value.data.payDate,
//         paymentMethod: value.data.paymentMethod,
//         totalPrice: value.data.totalPrice,
//         status: response.data[index].status,
//         products: value.data.products,
//         shipperPhone: response.data[index].shipperPhone,
//         shipperName: response.data[index].shipperName,
//       },
//     ],
//     []
//   );
//   return data;
// }
