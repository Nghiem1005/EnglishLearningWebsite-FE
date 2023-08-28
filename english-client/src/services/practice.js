import axios from "axios";
import { API } from "../api/baseUrl";

export const practiceService = {
  getAllTests: async ({ size, page }) => {
    try {
      const response = await API.get(`/api/v1/exam?size=${size}&page=${page}`);
      return response.data;
    } catch (error) {}
  },

  getTest: async ({ testId }) => {
    try {
      const response = await API.get(`/api/v1/exam/${testId}`);
      return response.data;
    } catch (error) {}
  },

  getPracticesByExam: async ({ partIds }) => {
    try {
      const callApiPartsExam = partIds?.map((partExam) =>
        API.get(`/api/v1/part/${partExam}`)
      );
      const resPartsExam = await axios.all(callApiPartsExam);
      const formatDataRes = resPartsExam.reverse().reduce(
        (acc, partExam) => [...acc, { ...partExam?.data?.data }],
        []
      );
      return formatDataRes;
    } catch (error) {}
  },

  postScoreByPractice: async ({ userId, data }) => {
    try {
      const response = await API.post(
        `/api/v1/practice?userId=${userId}`,
        data
      );
      return response;
    } catch (error) {}
  },
  getAllsHistoryPracticesByUser: async ({ userId, page, size }) => {
    try {
      const response = await API.get(
        `/api/v1/practice/result/user/${userId}?size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },

  getQuestion: async ({ questionId }) => {
    try {
      const response = await API.get(`/api/v1/question/${questionId}`);
      return response.data?.data;
    } catch (error) {
      return error.response
    }
  },

  getScorePracticeLesson: async ({ lessonId, userId }) => {
    try {
      const response = await API.get(`/api/v1/practice/result/user/lesson/${userId}/${lessonId}`);
      return response.data;
    } catch (error) {
      return error.response
    }
  },

  getDetailHistoryPracticeByUser: async ({ testId }) => {
    try {
      const response = await API.get(`/api/v1/practice/result/${testId}`);
      const percent = response.data?.data?.result.split("/");

      const numberCorrectAnswer =
        response.data?.data?.partResultResponseDTOS?.reduce(
          (acc, partResult) =>
            acc +
            partResult?.resultResponseDTOS?.reduce(
              (acc, result) => (result?.correct ? acc + 1 : acc),
              0
            ),
          0
        );
      const numberWrongAnswer =
        response.data?.data?.partResultResponseDTOS?.reduce(
          (acc, partResult) =>
            acc +
            partResult?.resultResponseDTOS?.reduce(
              (acc, result) =>
                result?.choice !== result?.answer && result?.choice !== 0
                  ? acc + 1
                  : acc,
              0
            ),
          0
        );
      const numberEmptyAnswer =
        response.data?.data?.partResultResponseDTOS?.reduce(
          (acc, partResult) =>
            acc +
            partResult?.resultResponseDTOS?.reduce(
              (acc, result) => (result?.choice === 0 ? acc + 1 : acc),
              0
            ),
          0
        );
      const typesPart = response.data?.data?.partResultResponseDTOS?.reduce(
        (acc, partResult) => {
          const isHas = acc.some((item) => item === partResult?.type);
          if (
            (partResult?.type === "READING" ||
              partResult?.type === "LISTENING") &&
            !isHas
          ) {
            return [...acc, partResult?.type];
          } else {
            return [...acc];
          }
        },
        []
      );
      return {
        ...response.data?.data,
        percent: ((percent[0] / percent[1]) * 100).toFixed(2),
        numberCorrectAnswer,
        numberWrongAnswer,
        numberEmptyAnswer,
        typesPart,
      };
    } catch (error) {}
  },
};
