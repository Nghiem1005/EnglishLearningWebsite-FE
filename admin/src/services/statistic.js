import { API } from "../api/baseUrl";

export const statisticService = {
  getStatisticAllByDay: async () => {
    try {
      const response = await API.get(`/api/v1/statistic/day`);
      return response;
    } catch (error) {}
  },
  getStatisticGeneral: async () => {
    try {
      const response = await API.get(`/api/v1/statistic/general`);
      return response;
    } catch (error) {}
  },
  getStatisticCourseSeller: async () => {
    try {
      const response = await API.get(`/api/v1/statistic/course/seller`);
      return response;
    } catch (error) {}
  },
  getStatisticSoldByCourse: async ({ courseId }) => {
    try {
      const response = await API.get(`/api/v1/statistic/course/info`);
      return response;
    } catch (error) {}
  },
};
