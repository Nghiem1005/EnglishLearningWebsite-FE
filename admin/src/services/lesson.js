import { API } from "../api/baseUrl";

export const lessonService = {
  getAllLessonByCourse: async ({ courseId, size, page = 1, option }) => {
    if (courseId) {
      try {
        const response = await API.get(
          `/api/v1/lesson/course?courseId=${courseId}&page=${page}&size=${size}`, option
        );
        return response;
      } catch (error) {}
    }
  },
  createLesson: async (courseId, data) => {
    try {
      const response = await API.post(`/api/v1/lesson?courseId=${courseId}`, data);
      return response;
    } catch (error) {}
  },
  getLesson: async (lessonId) => {
    try {
      const response = await API.get(`/api/v1/lesson/${lessonId}`);
      return response;
    } catch (error) {}
  },
  updateLesson: async (lessonId, data) => {
    try {
      const response = await API.put(
        `/api/v1/lesson?id=${lessonId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  deleteLesson: async (lessonId) => {
    try {
      await API.delete(`/api/v1/lesson?id=${lessonId}`);
    } catch (error) {}
  }
};

