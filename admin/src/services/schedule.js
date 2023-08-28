import { API } from "../api/baseUrl";

export const scheduleService = {
  addSchedule: async ({ code, lessonId, data }) => {
    try {
      const response = await API.post(
        `/schedule?code=${code}&lessonId=${lessonId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  updateSchedule: async ({ code, lessonId }) => {
    try {
      const { data } = await API.put(
        `/api/v1/category?page=${page + 1}&size=${size}`
      );
      const response = data.data.reduce(
        (acc, item) => [
          ...acc,
          {
            Id: item.id,
            Description: item.link,
            Subject: item.title,
            StartTime: item.startDate,
            EndTime: item.endDate,
          },
        ],
        []
      );
      return response;
    } catch (error) {}
  },
  getAllSchedule: async ({ teacherId }) => {
    try {
      const { data } = await API.get(`/teacher?teacherId=${teacherId}`);
      const response = data.data.reduce(
        (acc, item) => [
          ...acc,
          {
            Id: item.id,
            Description: item.link,
            Subject: "Lịch học lesson " + item.lessonId,
            StartTime: item.startDate,
            EndTime: item.endDate,
          },
        ],
        []
      );
      return response;
    } catch (error) {}
  },
  deleteSchedule: async ({ scheduleId, code }) => {
    try {
      const response = await API.delete(
        `/schedule?code=${code}&id=${scheduleId}`
      );
      return response;
    } catch (error) {}
  },
};

export const createCategory = async (dataCategory) => {
  try {
    const response = await API.post(`/api/v1/category`, dataCategory);
    return response;
  } catch (error) {}
};

export const updateCategory = async (categoryId, updateCategory) => {
  try {
    const response = await API.put(
      `/api/v1/category?id=${categoryId}`,
      updateCategory
    );
    return response;
  } catch (error) {}
};

export const deleteCategory = async (categoryId) => {
  try {
    await API.delete(`/api/v1/category?id=${categoryId}`);
  } catch (error) {}
};
