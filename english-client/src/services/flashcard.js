import { API } from "../api/baseUrl";
import axios from "axios";

export const flashcardService = {
  getAllFlashcard: async ({ userId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/word_list/user?userId=${userId}&size=${size}&page=${page}`
      );
      return response;
    } catch (error) {}
  },
  addFlashcard: async ({ userId, dataFlashcard }) => {
    try {
      const response = await API.post(
        `/api/v1/word_list?userId=${userId}`,
        dataFlashcard
      );
      return response;
    } catch (error) {}
  },
  updateFlashcard: async ({ flashcardId, updateData }) => {
    try {
      const response = await API.put(`/api/v1/word_list?listWordId=${flashcardId}`, updateData);
      return response;
    } catch (error) {}
  },
  getFlashcard: async ({ flashcardId, size, page }) => {
    try {
      const response = await API.get(
        `/api/v1/word_list/${flashcardId}?page=${page}&size=${size}`
      );
      return response;
    } catch (error) {}
  },
  deleteFlashcard: async ({ flashcardId }) => {
    try {
      const response = await API.delete(`/api/v1/word_list?listWordId=${flashcardId}`);
      return response;
    } catch (error) {}
  },
  addWord: async ({ listWordId, updateData }) => {
    try {
      const response = await API.post(`/api/v1/word?listWordId=${listWordId}`, updateData);
      return response;
    } catch (error) {}
  },
  updateWord: async ({ wordId, updateData }) => {
    try {
      const response = await API.put(`/api/v1/word?wordId=${wordId}`, updateData);
      return response;
    } catch (error) {}
  },
  deleteWord: async ({ wordId }) => {
    try {
      const response = await API.delete(`/api/v1/word?id=${wordId}`);
      return response;
    } catch (error) {}
  },
};
