import { API } from "../api/baseUrl";
import { billService } from "./bill";

export const courseService = {
  getAllCourse: async ({ size, page, userId }) => {
    try {
      const response = await API.get(
        `/api/v1/course?size=${size}&page=${page}&userId=${userId}`
      );
      const billResponse = await billService.getAllBillByUser({ userId });
      const dataResFormat = response.data.data.map((course) =>
        billResponse?.find((bill) => bill.courseId === course.id)
          ? { ...course, isPayed: true }
          : { ...course, isPayed: false }
      );

      return billResponse?.length > 0
        ? { data: dataResFormat, totalPage: response.data.totalPage }
        : {
            totalPage: response.data.totalPage,
            data: response.data.data.map((course) => ({
              ...course,
              isPayed: false,
            })),
          };
    } catch (error) {}
  },

  getAllCourseLiked: async ({ size, page, userId }) => {
    try {
      const response = await API.get(
        `/api/v1/course/like/${userId}?size=${size}&page=${page}`
      );
      const billResponse = await billService.getAllBillByUser({ userId });
      const dataResFormat = response.data.data.map((course) =>
        billResponse?.find((bill) => bill.courseId === course.id)
          ? { ...course, isPayed: true }
          : { ...course, isPayed: false }
      );

      return billResponse?.length > 0
        ? { data: dataResFormat, totalPage: response.data.totalPage }
        : {
            totalPage: response.data.totalPage,
            data: response.data.data.map((course) => ({
              ...course,
              isPayed: false,
            })),
          };
    } catch (error) {}
  },

  getAllCourseType: async () => {
    try {
      const response = await API.get(`/api/v1/course/type`);
      return response.data;
    } catch (error) {}
  },

  getAllCourseFilter: async ({ userId, search, page, size }) => {
    try {
      const response = await API.get(
        `/api/v1/course/filter?size=${size}&page=${page}&userId=${userId}&search=${search}`
      );
      const billResponse = await billService.getAllBillByUser({ userId });
      const dataResFormat = response.data.data.map((course) =>
        billResponse?.find((bill) => bill.courseId === course.id)
          ? { ...course, isPayed: true }
          : { ...course, isPayed: false }
      );

      return billResponse?.length > 0
        ? { data: dataResFormat, totalPage: response.data.totalPage }
        : {
            totalPage: response.data.totalPage,
            data: response.data.data.map((course) => ({
              ...course,
              isPayed: false,
            })),
          };
    } catch (error) {}
  },
  
  addTarget: async ({ data, userId }) => {
    try {
      const response = await API.post(`/api/v1/target?userId=${userId}`, data);
      return response.data;
    } catch (error) {}
  },

  getTarget: async ({ userId }) => {
    try {
      const response = await API.get(`/api/v1/target/user?userId=${userId}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  getAllCourseByTeacher: async ({ teacherId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/course/teacher/${teacherId}?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
  downloadDocumentOfCourse: async ({ document }) => {
    try {
      const response = await API.get(`/document/download/course/${document}`);
      return response;
    } catch (error) {}
  },

  getCourse: async ({ courseId, userId }) => {
    try {
      const response = await API.get(
        `/api/v1/course/${courseId}?userId=${userId}`
      );
      const resCourseInfo = await API.get(
        `api/v1/statistic/course/info/${courseId}`
      );
      const billResponse = await billService.getAllBillByUser({ userId });
      const dataResFormat = billResponse?.find(
        (bill) => bill.courseId === response.data.data.id
      )
        ? {
            ...response.data.data,
            isPayed: true,
            infoCourse: resCourseInfo.data.data,
          }
        : {
            ...response.data.data,
            isPayed: false,
            infoCourse: resCourseInfo.data.data,
          };
      return billResponse?.length > 0
        ? dataResFormat
        : {
            ...response.data.data,
            isPayed: false,
            infoCourse: resCourseInfo.data.data,
          };
    } catch (error) {}
  },

  likeCourse: async ({ courseId, userId }) => {
    try {
      const response = await API.post(
        `/api/v1/course/like?studentId=${userId}&courseId=${courseId}`
      );
      return response.data;
    } catch (error) {}
  },
  unlikeCourse: async ({ courseId, userId }) => {
    try {
      const response = await API.delete(
        `/api/v1/course/like?studentId=${userId}&courseId=${courseId}`
      );
      return response.data;
    } catch (error) {}
  },

  getAllEvaluateByCourse: async ({ size, page, courseId }) => {
    try {
      const response = await API.get(
        `/api/v1/feedback/course?page=${page}&size=${size}&courseId=${courseId}&pending=false`
      );
      return response;
    } catch (error) {}
  },

  addEvaluateCourse: async ({ data }) => {
    try {
      const response = await API.post(`/api/v1/feedback`, data);
      return response;
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
