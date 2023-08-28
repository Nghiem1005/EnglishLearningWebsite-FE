import axios from "axios";
import { API } from "../api/baseUrl";

export const lessonService = {
  getAllLessonByCourse: async ({ courseId, size, page, option = {} }) => {
    if (courseId) {
      try {
        const response = await API.get(
          `/api/v1/lesson/course?courseId=${courseId}&page=${page}&size=${size}`,
          option
        );
        return response;
      } catch (error) {}
    }
  },

  getLesson: async ({ lessonId }) => {
    try {
      const response = await API.get(`/api/v1/lesson/${lessonId}`);
      const practiceByLessonRes = await API.get(
        `/api/v1/exam/lesson?lessonId=${response.data?.data?.id}`
      );
      let partsPracticeData = [];
      if (practiceByLessonRes.data?.data) {
        const partsPracticeApi =
          practiceByLessonRes.data?.data?.partResponseDTOS?.map((part) =>
            API.get(`/api/v1/part/${part?.id}`)
          );
        const partsPracticeRes = await axios.all(partsPracticeApi);
        partsPracticeData = partsPracticeRes.reduce(
          (acc, part) => [
            ...acc,
            {
              ...part?.data?.data,
            },
          ],
          []
        );
      }
      return { lesson: response.data?.data, practice: partsPracticeData };
    } catch (error) {}
  },

  getAllFeedbackByLesson: async ({ size, page, lessonId }) => {
    try {
      const response = await API.get(
        `/api/v1/inquiry/lesson?page=${page}&size=${size}&lessonId=${lessonId}`
      );

      return response;
    } catch (error) {}
  },

  addFeedbackLesson: async ({ data }) => {
    try {
      const response = await API.post(`/api/v1/inquiry`, data);
      return response;
    } catch (error) {}
  },

  updateFeedbackLesson: async ({ size, page, commentMainId }) => {
    try {
      const response = await API.put(`/api/v1/inquiry?content=1&id=2`);
      return response;
    } catch (error) {}
  },

  deleteFeedbackLesson: async ({ commentId }) => {
    try {
      const response = await API.get(`/api/v1/inquiry?id=${commentId}`);
      return response;
    } catch (error) {}
  },
};
