// Axios client instance config + automatic JWT bearer interceptor
// app/api/client.ts
import axios, {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
} from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7001/api", // Adjust to match your .NET local Development Port
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatic request interceptor injection
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("garden_jwt");
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Automatic response expiration structural handler
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("garden_jwt");
                window.location.href = "/login"; // Clear application scope on expiration
            }
        }
        return Promise.reject(error);
    },
);
