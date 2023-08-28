import { createContext, useContext, useState } from "react";
import { login } from "../services/auth";
import { handleRequestApi } from "../api/baseUrl";
import { userCommonService } from "../services/user";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("teacher")));

  const loginUser = async (formData) => {
    try {
      const { data } = await login(formData);
      if (data.status === "OK") {
        localStorage.setItem("teacher", JSON.stringify(data.data));
        handleRequestApi(data?.data?.accessToken);
        setUser(data.data);
        const response = await userCommonService.getUser({
          userId: data.data.id,
        });
        localStorage.setItem("teacher-detail", JSON.stringify(response.data.data));
      }
      return data;
    } catch (error) {
      return error.response;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("code_teacher");
    localStorage.removeItem("teacher");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
