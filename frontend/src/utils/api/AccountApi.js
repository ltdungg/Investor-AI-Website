import axios from "axios";
import { urlBackend, jwtTagStorage, defaultUrl } from "../../components/const/Global";

const authenticationApi = axios.create({
    baseURL: urlBackend + "/auth", // URL của backend
    method: "post",
    headers: { "Content-Type": "application/json" },
});

authenticationApi.interceptors.response.use(
    (response) => {
        const data = response.data;
        window.localStorage.setItem(jwtTagStorage, data);
        console.log("Login successful!", data);
        window.location.href = defaultUrl;
    },
    (error) => {
        console.error("Login failed!", error);
        return error;
    }
);

export default authenticationApi;
