import { API } from "../api/baseUrl";
import axios from "axios";

export const courseService = {
  getAllCourse: async ({ size, page, userId }) => {
    try {
      const response = await API.get(
        `/api/v1/course?size=${size}&page=${page}&userId=${userId}`
      );
      return response;
    } catch (error) {}
  },
  getAllCourseByTeacher: async ({ teacherId, size, page }) => {
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
      const response = await API.get(
        `/api/v1/course/${courseId}&userId=${userId}`
      );
      return response;
    } catch (error) {}
  },
  deleteCourse: async ({ courseId }) => {
    try {
      const response = await API.delete(`/api/v1/course/${courseId}`);
      return response;
    } catch (error) {}
  },

  getAllEvaluatesCourse: async ({ size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/feedback?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {}
  },

  getAllEvaluatesByCourse: async ({ courseId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/feedback/course?page=${page}&size=${size}&courseId=${courseId}`
      );
      return response.data;
    } catch (error) {}
  },

  getAllPendingEvaluatesByCourse: async ({ courseId, size, page, pending }) => {
    try {
      const response = await API.get(
        `/api/v1/feedback/course/pending?page=${page}&size=${size}&courseId=${courseId}&pending=${pending}`
      );
      return response.data;
    } catch (error) {}
  },

  addEvaluateCourse: async ({ data }) => {
    try {
      const response = await API.post(`/api/v1/feedback`, data);
      return response;
    } catch (error) {}
  },

  updateEvaluateCourse: async ({ feedbackId, data }) => {
    try {
      const response = await API.put(`/api/v1/feedback?id=${feedbackId}`, data);
      return response.data;
    } catch (error) {}
  },

  deleteEvaluateCourse: async ({ feedbackId }) => {
    try {
      const response = await API.delete(`/api/v1/feedback?id=${feedbackId}`);
      return response.data;
    } catch (error) {}
  },
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
