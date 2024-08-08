import axios from "axios";
import { getToken, removeAllTokens } from "./localStorage.mjs";

const jwtInterceptor = () => {
  axios.interceptors.request.use((req) => {
    const token = getToken();
    if (token) {
        req.headers = {
          ...req.headers,
          Authorization: `Bearer ${token}`,
        };
    }
    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      console.log(error);
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        removeAllTokens()
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );
};

export default jwtInterceptor;
