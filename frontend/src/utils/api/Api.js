import axios from "axios";
import { urlBackend, jwtTagStorage } from "../const/Global";

const loginUrl = "/login";

const api = axios.create({
  baseURL: urlBackend, // URL của backend
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(jwtTagStorage);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const responseCode = error.response.status;
      const responseData = error.response.data;
    //   const requiresAuth = error.config?.requiresAuth; // Lấy cờ tùy chỉnh

      if (responseCode === 401 || responseCode == 403) {
        console.log("Token hết hạn! Chuyển về trang login...");
        window.localStorage.removeItem(jwtTagStorage); // Xoá token
        window.location.href = loginUrl; // Điều hướng về trang đăng nhập
      } else {
        console.log(responseData);
        alert(responseData);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
