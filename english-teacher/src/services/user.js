import axios from "axios";
import { API } from "../api/baseUrl";

export const teacherService = {
  getAllTeacher: async ({ size = 1000, page = 1 }) => {
    try {
      const { data: dataTeacherRes } = await API.get(
        `/api/v1/user/teacher?size=${size}&page=${page}`
      );
      const result = dataTeacherRes.data.map((teacher) =>
        API.get(
          `/api/v1/course/teacher/${teacher.id}?size=${size}&page=${page}`
        )
      );
      const response = await axios.all(result);
      const dataResponse = response.reduce(
        (acc, coursesOfTeacher, index) => [
          ...acc,
          {
            teacherId: dataTeacherRes.data[index].id,
            email: dataTeacherRes.data[index].email,
            name: dataTeacherRes.data[index].name,
            phone: dataTeacherRes.data[index].phone,
            enable: dataTeacherRes.data[index].enable,
            role: dataTeacherRes.data[index].role,
            image: dataTeacherRes.data[index].image,
            provider: dataTeacherRes.data[index].provider,
            courses: coursesOfTeacher.data.data,
          },
        ],
        []
      );
      return dataResponse;
    } catch (error) {}
  },
  createTeacher: async (formData) => {
    try {
      const response = await API.post(`/register`, formData);
      return response;
    } catch (error) {}
  },
  updateTeacher: async ({ teacherId, updateData }) => {
    try {
      await API.put(`/api/v1/user/${userId}`, updateData);
    } catch (error) {}
  },
  sendMail: async ({ email }) => {
    try {
      const response = await API.post(`/sendMail`, { email });
      return response;
    } catch (error) {
      return error;
    }
  },
};

export const userCommonService = {
  getUser: async ({ userId }) => {
    try {
      const response = await API.get(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {}
  },
  deleteUser: async ({ userId }) => {
    try {
      await API.delete(`/api/v1/user/${userId}`);
    } catch (error) {}
  },
  updateUser: async ({ userId, updateData }) => {
    try {
      const response = await API.put(`/api/v1/user/${userId}`, updateData);
      return response;
    } catch (error) {}
  },
  changePassword: async ({ userId, updateData }) => {
    try {
      await API.put(`/api/v1/user/password/${userId}`, updateData);
    } catch (error) {}
  },
  sendResetPassword: async ({ email }) => {
    try {
      const response = await API.post(`/newPassword`, { email });
      return response;
    } catch (error) {
      return error;
    }
  },
};

export const studentService = {
  createStudent: async ({ formData }) => {
    try {
      const response = await API.post("/api/v1/user", formData);
      return response;
    } catch (error) {}
  },
  getAllUserByCourse: async ({ courseId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/user/student/course?courseId=${courseId}&size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
};
