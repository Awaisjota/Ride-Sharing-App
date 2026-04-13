import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://ride-sharing-app-six.vercel.app/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

// 🔥 ADD THIS (IMPORTANT)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN BEING SENT:", token); // debug

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor (ok to keep)
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;