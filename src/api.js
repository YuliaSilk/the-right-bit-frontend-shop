import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://right-bite-store.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

// 🧩 додаємо токен у заголовки кожного запиту
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 якщо токен протух — оновлюємо
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = data.access_token || data.accessToken;
        localStorage.setItem("access_token", newAccessToken);

        // повторюємо запит із новим токеном
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
