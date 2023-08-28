import axios from "axios";
import { API_URL } from "../constants/thunkTypes";
import { authService } from "../services/auth";

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.accessToken || "";
};
const token = getToken();

export const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (req) => {
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.data.status === 401 &&
      error.response.data.message ===
        "Full authentication is required to access this resource"
    ) {
      const authData = JSON.parse(localStorage.getItem("user"));
      const payload = {
        refreshToken: authData.refreshToken,
      };
      let apiResponse = await authService.refreshToken(payload);
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: apiResponse.accessToken,
          refreshToken: apiResponse.refreshToken,
          id: authData.id,
        })
      );
      error.config.headers[
        "Authorization"
      ] = `Bearer ${apiResponse.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export const handleRequestApi = (token) => {
  API.interceptors.request.use(
    (req) => {
      if (token) {
        req.headers["Authorization"] = `Bearer ${token}`;
      }
      return req;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
