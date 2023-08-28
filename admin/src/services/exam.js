import { API } from "../api/baseUrl";

export const examService = {
  createExamTest: async ({ data }) => {
    try {
      const response = await API.post(`/api/v1/exam`, data);
      return response;
    } catch (error) {}
  },
  createPracticeLesson: async ({ data, lessonId }) => {
    try {
      const response = await API.post(`/api/v1/exam/lesson?lessonId=${lessonId}`, data);
      return response;
    } catch (error) {}
  },
  createPartExamTest: async ({ examId, data }) => {
    try {
      const response = await API.post(`/api/v1/part?examId=${examId}`, data);
      return response;
    } catch (error) {}
  },
  createPhraseQuestionTest: async ({ partId, data }) => {
    try {
      const response = await API.post(
        `/api/v1/question-phrase?partId=${partId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  createExam: async ({ lessonId, data }) => {
    try {
      const response = await API.post(
        `/api/v1/exam/lesson?lessonId=${lessonId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  updateExam: async ({ examId, dataUpdate }) => {
    try {
      const response = await API.put(`/api/v1/exam?id=${examId}`, dataUpdate);
      return response;
    } catch (error) {}
  },
  createPartExam: async ({ lessonId, data }) => {
    try {
      const response = await API.post(
        `/api/v1/exam?lessonId=${lessonId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  createExercise: async ({ examId, lessonId }) => {
    try {
      const response = await API.post(
        `/api/v1/exercise?examId=${examId}&lessonId=${lessonId}`
      );
      return response;
    } catch (error) {}
  },

  getAllListExams: async ({ page, size }) => {
    try {
      const response = await API.get(`/api/v1/exam?size=${size}&page=${page}`);
      return response;
    } catch (error) {}
  },
  getExam: async ({ testId }) => {
    try {
      const response = await API.get(`/api/v1/exam?size=${size}&page=${page}`);
      return response;
    } catch (error) {}
  },
  deleteExam: async ({ testId }) => {
    try {
      const response = await API.delete(`/api/v1/exam?examId=${testId}`);
      return response;
    } catch (error) {}
  },
};
