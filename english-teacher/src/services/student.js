import { API } from "../api/baseUrl";

export const studentService = {
  getAllStudentByCourse: async ({ courseId, page, size }) => {
    try {
      const response = await API.get(
        `/api/v1/user/student/course?courseId=${courseId}&size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
};

export const createUser = async (formData) => {
  try {
    const response = await API.post("/api/v1/user", formData);
    return response;
  } catch (error) {}
};

export const getAllUSers = async ({ size, page }) => {
  try {
    const response = await API.get(
      `/api/v1/user?page=${page + 1}&size=${size}`
    );
    return response;
  } catch (error) {}
};

export const getUSer = async (userId) => {
  try {
    const response = await API.get(`/api/v1/user/${userId}`);
    return response;
  } catch (error) {}
};

export const updateUSer = async (userId, updateUser) => {
  try {
    const response = await API.put(`/api/v1/user/${userId}`, updateUser);
    return response;
  } catch (error) {}
};

export const deleteUser = async (userId) => {
  try {
    await API.delete(`/api/v1/user/${userId}`);
  } catch (error) {}
};

export const createAddressByUser = async (userId, formData) => {
  try {
    const response = await API.post(
      `/api/v1/address/user?userId=${userId}`,
      formData
    );
    return response;
  } catch (error) {}
};
