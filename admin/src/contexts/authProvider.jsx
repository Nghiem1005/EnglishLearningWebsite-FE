import { createContext, useContext, useState } from "react";
import { login } from "../services/auth";
import { userCommonService } from "../services/user";
import { handleRequestApi } from "../api/baseUrl";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("admin-detail"))
  );
  const [userExpireToken, setUserExpireToken] = useState(
    JSON.parse(localStorage.getItem("admin"))
  );

  const loginUser = async (formData) => {
    const { data } = await login(formData);
    if (data.status === "OK") {
      handleRequestApi(data?.data?.accessToken);
      const response = await userCommonService.getUser({
        userId: data.data.id,
      });
      localStorage.setItem("admin", JSON.stringify(data.data));
      localStorage.setItem("admin-detail", JSON.stringify(response.data.data));
      setUser(response.data.data);
      setUserExpireToken(data.data);
    }
    return data;
  };

  const logoutUser = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("admin-detail");
    setUser(null);
    setUserExpireToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, logoutUser, user, userExpireToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
