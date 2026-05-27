import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

const LOCAL_STORAGE_KEY = "@recipesFromHeart";

// Attach token automatically from localStorage for each request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore (localStorage might be unavailable in some environments)
  }

  return config;
});

// Global response handler: on 401, clear session and redirect to sign-in
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = String(error?.config?.url ?? "");

    if (status === 401 && !requestUrl.includes("/sessions")) {
      try {
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
      } catch (_) {}
      window.location.assign("/");
    }
    return Promise.reject(error);
  },
);
