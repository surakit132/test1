import React, { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  getToken,
  removeAllTokens,
  setUserToken,
} from "../utils/localStorage.mjs";
import { SERVER_API_URL } from "../core/config.mjs";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const getAllToken = () => {
    const checkToken = Boolean(getToken());
    if (checkToken) {
      return jwtDecode(getToken());
    } else {
      return null;
    }
  };
  const [state, setState] = useState({
    loading: false,
    error: null,
    user: getAllToken(),
  });

  // useEffect(()=>{
  //   console.log(state)
  // },[state])

  const navigate = useNavigate();

  const loginUser = async (data) => {
    setState({ ...state, loading: true });
    try {
      const result = await axios.post(
        `${SERVER_API_URL}/auth/login/user`,
        data
      );
      const token = result.data.token;
      setUserToken(token);
      const userDataFromToken = jwtDecode(token);

      setState({ ...state, user: userDataFromToken, loading: false });
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response ? error.response.data.message : "Login failed",
      });
    }
  };

  const loginPetSitter = async (data) => {
    setState({ ...state, loading: true });
    try {
      const result = await axios.post(
        `${SERVER_API_URL}/auth/login/petsitter`,
        data
      );
      const token = result.data.token;
      setUserToken(token);
      const userDataFromToken = jwtDecode(token);

      setState({ ...state, user: userDataFromToken, loading: false });
      navigate("/");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response ? error.response.data.message : "Login failed",
      });
    }
  };

  const registerUser = async (data) => {
    setState({ ...state, loading: true });
    try {
      await axios.post(`${SERVER_API_URL}/auth/register/user`, data);
      setState({ ...state, loading: false });
      navigate("/auth/login/user");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response
          ? error.response.data.message
          : "Registration failed",
      });
    }
  };

  const registerPetSitter = async (data) => {
    setState({ ...state, loading: true });
    try {
      await axios.post(`${SERVER_API_URL}/auth/register/petsitter`, data);
      setState({ ...state, loading: false });
      navigate("/auth/login/petsitter");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response
          ? error.response.data.message
          : "Registration failed",
      });
    }
  };

  const logout = () => {
    removeAllTokens();
    setState({ ...state, user: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(getAllToken());

  return (
    <AuthContext.Provider
      value={{
        state,
        setState,
        loginUser,
        loginPetSitter,
        registerUser,
        registerPetSitter,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
