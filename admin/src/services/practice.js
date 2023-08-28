import axios from "axios";
import { API } from "../api/baseUrl";

export const practiceService = {
  getAllPractices: async ({ lessonId }) => {
    try {
      const { data } = await API.get(
        `/api/v1/exam/lesson?lessonId=${lessonId}`
      );
      if (data.status === "OK") {
        const result = data.data.map((item) =>
          API.get(`/api/v1/partExam/exam?examId=${item.id}`)
        );

        const response = await axios.all(result);
        // console.log(response);
        // const dataRes = response.reduce(
        //   (acc, item) => [...acc, item.data.data],
        //   []
        // );
        return response[0].data.data;
      }
    } catch (error) {}
  },
  getPractices: async ({ lessonId }) => {
    try {
      const response = await API.get(
        `/api/v1/exam/lesson?lessonId=${lessonId}`
      );
      const callApiPartsExam = response?.data?.data?.partResponseDTOS?.map((partExam) =>
        API.get(`/api/v1/part/${partExam?.id}`)
      );
      const resPartsExam = await axios.all(callApiPartsExam);
      const formatDataRes = resPartsExam.reduce(
        (acc, partExam) => [...acc, { ...partExam?.data?.data }],
        []
      );
      return {
        exam: {...response.data?.data},
        partExam: formatDataRes
      };
    } catch (error) {}
  },
  getPracticeByExam: async ({ examId }) => {
    try {
      const response = await API.get(`/api/v1/partExam/exam?examId=${examId}`);
      return response;
    } catch (error) {}
  },
  updatePractice: async ({ practiceId, data }) => {
    try {
      const response = await API.put(`/api/v1/partExam?id=${practiceId}`, data);
      return response;
    } catch (error) {}
  },
  updateManyPractice: async ({ practiceId, data }) => {
    try {
      const { name, dataUpdate } = data;
      const result = dataUpdate.map((exam) =>
        API.put(`/api/v1/partExam?id=${practiceId}`, exam)
      );
      return result;
    } catch (error) {}
  },
  deletePractice: async ({ practiceId }) => {
    try {
      await API.delete(`/api/v1/partExam?id=${practiceId}`);
    } catch (error) {}
  },
};
