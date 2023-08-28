import { API } from "../api/baseUrl";
export const authService = {
  refreshToken: async (data) => {
    try {
      const resp = await API.post("refreshToken", data);
      return resp.data;
    } catch (e) {
      console.log("Error", e);
    }
  },
};

export const login = async (formData) => {
  try {
    const response = await API.post("/login/teacher", formData);
    return response;
  } catch (error) {
    return error.response;
  }
};
