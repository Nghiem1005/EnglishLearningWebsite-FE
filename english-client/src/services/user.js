import { API } from "../api/baseUrl";
import { billService } from "./bill";

export const userService = {
  getAllTeacher: async () => {
    try {
      const response = await API.get(`/api/v1/user/teacher`);
      return response?.data?.data;
    } catch (error) {
      return error.response;
    }
  },

  getTeacher: async ({ teacherId, userId }) => {
    try {
      const dataTeacherRes = await API.get(`/api/v1/user/${teacherId}`);
      const resultCourseByTeacher = await API.get(
        `/api/v1/course/teacher/${
          dataTeacherRes.data.data.id
        }?size=${1000}&page=${1}`
      );

      const billResponse = await billService.getAllBillByUser({ userId });
      const dataResFormat = resultCourseByTeacher.data.data.map((course) =>
        billResponse?.find((bill) => bill.courseId === course?.id)
          ? { ...course, isPayed: true }
          : { ...course, isPayed: false }
      );
      return billResponse?.length > 0
        ? {
            data: dataResFormat,
            teacher: dataTeacherRes?.data?.data,
            totalPage: resultCourseByTeacher.data.totalPage,
          }
        : {
            teacher: dataTeacherRes?.data?.data,
            totalPage: resultCourseByTeacher.data.totalPage,
            dataCourses: resultCourseByTeacher.data.data.map((course) => ({
              ...course,
              isPayed: false,
            })),
          };
    } catch (error) {
      return error.response;
    }
  },

  getUser: async (userId) => {
    try {
      const response = await API.get(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  updateUser: async (userId, updateUser) => {
    try {
      const response = await API.put(`/api/v1/user/${userId}`, updateUser);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await API.delete(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  sendResetPassword: async ({ email }) => {
    try {
      const response = await API.post(`/newPassword`, { email });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};

export const userCommonService = {
  getUser: async ({ userId }) => {
    try {
      const response = await API.get(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  deleteUser: async ({ userId }) => {
    try {
      const response = await API.delete(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  updateUser: async ({ userId, updateData }) => {
    try {
      const response = await API.put(`/api/v1/user/${userId}`, updateData);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  changePassword: async ({ userId, updateData }) => {
    try {
      const response = await API.put(
        `/api/v1/user/password/${userId}`,
        updateData
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  sendResetPassword: async ({ email }) => {
    try {
      const response = await API.post(`/newPassword`, { email });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
