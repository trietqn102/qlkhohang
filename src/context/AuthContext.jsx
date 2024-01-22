import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "~/service/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [statusCode, setStatusCode] = useState();

  const login = (data) => {
    authService
      .login({ data })
      .then((res) => {
        if (res?.response?.status) {
          setStatusCode(res.response.status);
        } else {
          localStorage.setItem("token", res.token);
          setToken(res.token);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    setToken("");
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);

  return (
    <AuthContext.Provider value={{ login, token, logOut, statusCode }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
