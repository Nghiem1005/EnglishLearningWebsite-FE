import { createContext, useContext, useState } from "react";
import { authService } from "../services/auth";
import { userCommonService } from "../services/user";
import { handleRequestApi } from "../api/baseUrl";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user-detail"))
  );
  const [userExpireToken, setUserExpireToken] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const loginUser = async (formData) => {
    try {
      const { data } = await authService.login(formData);
      if (data.status === "OK") {
        localStorage.setItem("user", JSON.stringify(data.data));
        setUserExpireToken(data.data);
        handleRequestApi(data.data?.accessToken);

        const response = await userCommonService.getUser({
          userId: data.data.id,
        });
        localStorage.setItem("user-detail", JSON.stringify(response.data.data));
        setUser(response.data.data);
      }
      return data;
    } catch (error) {
      return error.response;
    }
  };

  const loginWithGoogle = async () => {
    const response = await authService.loginWithGoogle();
    console.log(response);
    // if (data.status === "OK") {
    //   setUser(data.data);
    // }
    return response;
  };

  const loginWithThirdParty = async ({ dataAuthenUser }) => {
    setUser(dataAuthenUser);
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("user-detail");
    setUser(null);
    setUserExpireToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
        userExpireToken,
        loginWithGoogle,
        loginWithThirdParty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
