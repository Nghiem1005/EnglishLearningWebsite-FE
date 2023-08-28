import { API } from "../api/baseUrl";
import axios from "axios";

export const blogService = {
  getAllBlog: async ({ size, page }) => {
    try {
      const response = await API.get(`/api/v1/blog?size=${size}&page=${page}`);
      return response;
    } catch (error) {}
  },
  getAllBlogByUser: async ({ userId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/blog?userId=${userId}&size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
  addBlog: async ({ userId, dataBlog }) => {
    try {
      const response = await API.post(
        `/api/v1/blog?userId=${userId}`,
        dataBlog
      );
      return response;
    } catch (error) {}
  },
  updateBlog: async ({ blogId, updateData }) => {
    try {
      const response = await API.put(
        `/api/v1/blog?blogId=${blogId}`,
        updateData
      );
      return response;
    } catch (error) {}
  },
  getBlog: async ({ blogId }) => {
    try {
      const response = await API.get(`/api/v1/blog/${blogId}`);
      return response;
    } catch (error) {}
  },
  deleteBlog: async ({ blogId }) => {
    try {
      const response = await API.delete(`/api/v1/blog/${blogId}`);
      return response;
    } catch (error) {}
  },

  getAllFeedbackByBlog: async ({ size, page, blogId }) => {
    try {
      const response = await API.get(
        `/api/v1/comment/course?page=${page}&size=${size}&blogId=${blogId}`
      );
      
      return response
    } catch (error) {}
  },

  addFeedbackBlog: async ({ data }) => {
    try {
      const response = await API.post(`/api/v1/comment`, data);
      return response;
    } catch (error) {}
  },

  updateFeedbackBlog: async ({ size, page, commentMainId }) => {
    try {
      const response = await API.put(`/api/v1/comment?content=1&id=2`);
      return response;
    } catch (error) {}
  },

  deleteFeedbackBlog: async ({ commentId }) => {
    try {
      const response = await API.get(`/api/v1/comment?id=${commentId}`);
      return response;
    } catch (error) {}
  },
};


