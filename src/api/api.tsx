import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken") ||
          sessionStorage.getItem("refreshToken");
        if (refreshToken) {
          const { authService } = await import(
            "../features/Flashcard/services/authService"
          );
          const refreshResult = await authService.refreshToken();

          if (refreshResult.success && refreshResult.token) {
            originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("user");

      const protectedRoutes = ["/user", "/admin"];
      const currentPath = window.location.pathname;

      if (protectedRoutes.some((route) => currentPath.startsWith(route))) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
