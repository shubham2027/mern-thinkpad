import axios from "axios";
import { getToken, removeToken } from "./auth";

// in production, there's no localhost so we have to make this dynamic
// const BASE_URL = "http://localhost:5001/api"; // for development only 
const BASE_URL = import.meta.env.MODE === "development" ?  "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,

});

// [AUTH-EDIT-1] attach JWT automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// [AUTH-EDIT-2] auto-logout on unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const path = window.location.pathname;
      const isAuthPage = path === "/login" || path === "/signup";

      if (!isAuthPage) {
        removeToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export default api;