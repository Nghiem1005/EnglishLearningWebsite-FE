import { API } from "../baseUrl";
import { getUSer } from "../../api/fetchers/user";

export const getAllFeedbacks = async ({ size, page }) => {
  try {
    const response = await API.get(`/api/v1/feedback?page=${page + 1}&size=${size}`);
    return response;
  } catch (error) {}
};

export const getFeedback = async (feedbackId) => {
  try {
    const response = await API.get(`/api/v1/feedback/${feedbackId}`);
    return response;
  } catch (error) {}
};
