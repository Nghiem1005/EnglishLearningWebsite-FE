import { API } from "../api/baseUrl";

export const authService = {
  async login(formData) {
    try {
      const response = await API.post("/login/student", formData);
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  refreshToken: async (data) => {
    try {
      const resp = await API.post("/refreshToken", data);
      return resp.data;
    } catch (e) {
      console.log("Error", e);
    }
  },

  async loginWithGoogle() {
    try {
      const response = await API.get("/oauth2/authorize/google");
      return response;
    } catch (error) {}
  },
  async loginWithFacebook() {
    try {
      const response = await API.post("/oauth2/authorize/facebook");
      return response;
    } catch (error) {}
  },
  async register(data) {
    try {
      const response = await API.post("/register", data);
      return response;
    } catch (error) {}
  },
};
