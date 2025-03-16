import axios from "axios";
import { isVariable } from "../jwtUtils";
import { urlBackend, jwtTagStorage } from "../../components/const/Global";

const loginUrl = "/login";

const api = axios.create({
    baseURL: urlBackend, // URL của backend
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem(jwtTagStorage);

        if (token && isVariable(token)) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        } else {
            window.location.href = loginUrl; // Điều hướng về trang đăng nhập
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.log("Token hết hạn! Chuyển về trang login...");
            window.localStorage.removeItem(jwtTagStorage); // Xoá token
            window.location.href = loginUrl; // Điều hướng về trang đăng nhập
            return error;
        }
    }
);

export default api;